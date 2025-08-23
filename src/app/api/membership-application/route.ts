import { NextRequest, NextResponse } from 'next/server';
console.log('[membership-application API] Loaded route handler v2');
import { MongoClient } from 'mongodb';
import { sendAdminNotification, sendApplicantConfirmation } from '@/lib/email';
import { BackupStorage } from '@/lib/backup-storage';

// Force dynamic for API routes with database operations
export const dynamic = 'force-dynamic';

// Interface for membership application data
interface MembershipApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  society: string;
  interests: string;
  termsAccepted?: boolean; // keep optional so old submissions don't break
  submittedAt: Date;
}

// Enhanced MongoDB connection with retry logic
async function connectToMongoDB(): Promise<MongoClient> {
  const maxRetries = 3;
  let retryCount = 0;
  
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not configured');
  }

  while (retryCount < maxRetries) {
    try {
      console.log(`MongoDB connection attempt ${retryCount + 1}/${maxRetries}`);
      
      const client = new MongoClient(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 10000, // 10 second timeout
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority'
      });

      await client.connect();
      
      // Test the connection
      await client.db('admin').command({ ping: 1 });
      console.log('Successfully connected to MongoDB');
      return client;
      
    } catch (error: any) {
      console.error(`MongoDB connection attempt ${retryCount + 1} failed:`, error.message);
      retryCount++;
      
      if (retryCount >= maxRetries) {
        throw new Error(`Failed to connect to MongoDB after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
    }
  }
  
  throw new Error('MongoDB connection failed after all retry attempts');
}

export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    console.log('=== Processing membership application ===');
    
    // Parse and validate request body
    const body = await request.json();
    console.log('Received application data:', { 
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      society: body.society 
    });

    // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'society', 'interests'];
    const missingFields = requiredFields.filter(field => !body[field] || !body[field].toString().trim());
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields', 
          fields: missingFields 
        },
        { status: 400 }
      );
    }

    // Create application object
    const application: MembershipApplication = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      department: body.department.trim(),
      society: body.society.trim(),
      interests: body.interests.trim(),
      termsAccepted: !!body.termsAccepted,
      submittedAt: new Date()
    };

  // Response tracking
  let responseData: any = {
      success: true,
      message: 'Application submitted successfully',
      applicationId: null,
      timestamp: new Date().toISOString(),
      services: {
        database: { status: 'pending', error: null },
    emailAdmin: { status: 'pending', error: null, accepted: [] as any[] },
    emailApplicant: { status: 'pending', error: null, accepted: [] as any[] }
      }
    };

    // Attempt MongoDB connection and storage
    console.log('=== DATABASE OPERATION ===');
    let backupCreated = false;
    try {
      console.log('Environment check - MongoDB URI configured:', !!process.env.MONGODB_URI);
      
      if (!process.env.MONGODB_URI) {
        throw new Error('MongoDB URI not configured');
      }
      
      client = await connectToMongoDB();
      const db = client.db('ieee_kiet');
      const collection = db.collection('membership_applications');

      // Insert application
      const result = await collection.insertOne(application);
      responseData.applicationId = result.insertedId;
      responseData.services.database.status = 'success';
      console.log('✅ Application stored successfully:', result.insertedId);
      
    } catch (dbError: any) {
      console.error('❌ Database operation failed:', dbError.message);
      responseData.services.database.status = 'failed';
      responseData.services.database.error = dbError.message;
      
      // Log specific error types for debugging
      if (dbError.message.includes('ENOTFOUND')) {
        console.error('🔍 DNS Resolution Error - Check MongoDB Atlas cluster status and network access');
      } else if (dbError.message.includes('authentication')) {
        console.error('🔍 Authentication Error - Check MongoDB username/password');
      } else if (dbError.message.includes('timeout')) {
        console.error('🔍 Timeout Error - Check network connectivity');
      }

      // Attempt backup storage
      try {
        console.log('💾 Attempting backup storage...');
        const backup = new BackupStorage();
        const backupFilename = await backup.saveApplication(application);
        responseData.backupFile = backupFilename;
        responseData.services.database.status = 'backup';
        responseData.services.database.error = `MongoDB failed, saved to backup: ${backupFilename}`;
        backupCreated = true;
        console.log('✅ Application saved to backup storage');
      } catch (backupError: any) {
        console.error('❌ Backup storage also failed:', backupError.message);
        responseData.services.database.error += ` | Backup failed: ${backupError.message}`;
      }
    }

    // Send email notifications (independent of database)
    console.log('=== EMAIL NOTIFICATIONS ===');
    try {
      console.log('Email configuration check:', {
        smtp_user: !!process.env.SMTP_USER,
        smtp_pass: !!process.env.SMTP_PASS,
        admin_email: !!process.env.ADMIN_EMAIL,
        from_email: !!process.env.FROM_EMAIL
      });
      
      // Send admin notification
      try {
        console.log('Sending admin notification...');
  const adminResult = await sendAdminNotification(application as any);
  responseData.services.emailAdmin.status = adminResult.success ? 'success' : 'failed';
  responseData.services.emailAdmin.error = adminResult.success ? null : adminResult.error;
  responseData.services.emailAdmin.accepted = adminResult.accepted || [];
        
        if (adminResult.success) {
          console.log('✅ Admin notification sent successfully');
        } else {
          console.warn('❌ Admin notification failed:', adminResult.error);
        }
      } catch (adminEmailError: any) {
        console.error('❌ Admin email exception:', adminEmailError.message);
        responseData.services.emailAdmin.status = 'failed';
        responseData.services.emailAdmin.error = adminEmailError.message;
      }

      // Send applicant confirmation
      try {
        console.log('Sending applicant confirmation...');
  const applicantResult = await sendApplicantConfirmation(application as any);
  responseData.services.emailApplicant.status = applicantResult.success ? 'success' : 'failed';
  responseData.services.emailApplicant.error = applicantResult.success ? null : applicantResult.error;
  responseData.services.emailApplicant.accepted = applicantResult.accepted || [];
        
        if (applicantResult.success) {
          console.log('✅ Applicant confirmation sent successfully');
        } else {
          console.warn('❌ Applicant confirmation failed:', applicantResult.error);
        }
      } catch (applicantEmailError: any) {
        console.error('❌ Applicant email exception:', applicantEmailError.message);
        responseData.services.emailApplicant.status = 'failed';
        responseData.services.emailApplicant.error = applicantEmailError.message;
      }
      
    } catch (emailError: any) {
      console.error('❌ Email system error:', emailError.message);
      responseData.services.emailAdmin.status = 'failed';
      responseData.services.emailAdmin.error = emailError.message;
      responseData.services.emailApplicant.status = 'failed';
      responseData.services.emailApplicant.error = emailError.message;
    }

    // Determine response status and message
    console.log('=== RESPONSE DETERMINATION ===');
    const dbSuccess = responseData.services.database.status === 'success';
    const dbBackup = responseData.services.database.status === 'backup';
    const emailAdminSuccess = responseData.services.emailAdmin.status === 'success';
    const emailApplicantSuccess = responseData.services.emailApplicant.status === 'success';
    const anyEmailSuccess = emailAdminSuccess || emailApplicantSuccess;
    const anyDataStored = dbSuccess || dbBackup;

    console.log('Service status:', {
      database: dbSuccess,
      backup: dbBackup,
      emailAdmin: emailAdminSuccess,
      emailApplicant: emailApplicantSuccess
    });

    if (!anyDataStored && !anyEmailSuccess) {
      // Complete failure
      console.error('💥 Complete system failure');
      responseData.success = false;
      responseData.message = 'Application submission failed - please try again or contact support directly';
      return NextResponse.json(responseData, { status: 500 });
    }

    if (dbBackup && anyEmailSuccess) {
      // Backup mode but emails sent
      console.warn('⚠️ Running in backup mode');
      responseData.message = 'Application submitted successfully (backup mode) - we have received your application';
      responseData.warning = 'Your application is safely stored and will be processed soon';
    } else if (!anyDataStored) {
      // No storage but emails worked
      console.warn('⚠️ Storage failed but emails sent');
      responseData.message = 'Application submitted - email notifications sent';
      responseData.warning = 'Please follow up to ensure your application was recorded properly';
    } else if (!anyEmailSuccess) {
      // Data stored but emails failed
      console.warn('⚠️ Storage success but emails failed');
      responseData.message = 'Application stored successfully but email notifications failed';
      responseData.warning = 'Your application is saved - we will contact you soon';
    } else if (dbSuccess && anyEmailSuccess) {
      console.log('✅ Full success');
      responseData.message = 'Application submitted successfully - confirmation email sent';
    }

    console.log('=== Application processing completed ===');
    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    console.error('💥 Unexpected error in membership application:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your application',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
    
  } finally {
    // Cleanup MongoDB connection
    if (client) {
      try {
        await client.close();
        console.log('🔌 MongoDB connection closed');
      } catch (closeError) {
        console.error('❌ Error closing MongoDB connection:', closeError);
      }
    }
  }
}

// Health check endpoint
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: {
      mongodb_configured: !!process.env.MONGODB_URI,
      email_configured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
      admin_email_configured: !!process.env.ADMIN_EMAIL
    }
  };

  return NextResponse.json(health);
}
