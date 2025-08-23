import { NextRequest, NextResponse } from 'next/server';

// Interface for membership application data
interface MembershipApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  society: string;
  interests: string;
  termsAccepted: boolean;
  submittedAt: string;
}

// In-memory storage (replace with database in production)
let applications: MembershipApplication[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const applicationData: MembershipApplication = {
      ...body,
      submittedAt: new Date().toISOString()
    };

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'society', 'interests'];
    for (const field of requiredFields) {
      if (!applicationData[field as keyof MembershipApplication]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate terms acceptance
    if (!applicationData.termsAccepted) {
      return NextResponse.json(
        { error: 'Terms and conditions must be accepted' },
        { status: 400 }
      );
    }

    // Store the application (in production, save to database)
    applications.push(applicationData);

    // Send email notification (in production, use email service like SendGrid, AWS SES, etc.)
    await sendEmailNotification(applicationData);

    // Send confirmation email to applicant (in production, use email service)
    await sendConfirmationEmail(applicationData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        applicationId: applications.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing membership application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all applications (for admin purposes)
export async function GET() {
  try {
    return NextResponse.json(
      { 
        applications: applications,
        count: applications.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Email notification to IEEE administrators
async function sendEmailNotification(application: MembershipApplication) {
  // In production, implement actual email sending
  // Example with SendGrid, AWS SES, or other email service
  
  const emailContent = `
    New IEEE Membership Application Received
    
    Name: ${application.firstName} ${application.lastName}
    Email: ${application.email}
    Phone: ${application.phone}
    Department: ${application.department}
    Preferred Society: ${application.society}
    
    Interests: ${application.interests}
    
    Submitted: ${application.submittedAt}
  `;

  console.log('Email notification to admin:', emailContent);
  
  // Example with SendGrid:
  // await sgMail.send({
  //   to: 'ieee.kiet@kiet.edu',
  //   from: 'noreply@ieee-kiet.com',
  //   subject: 'New IEEE Membership Application',
  //   text: emailContent,
  // });
}

// Confirmation email to applicant
async function sendConfirmationEmail(application: MembershipApplication) {
  const emailContent = `
    Dear ${application.firstName} ${application.lastName},
    
    Thank you for your interest in joining IEEE KIET Student Branch!
    
    We have received your membership application and will review it shortly. 
    You will hear from us within 3-5 business days with next steps.
    
    Application Details:
    - Department: ${application.department}
    - Preferred Society: ${application.society}
    
    If you have any questions, please contact us at ieee.kiet@kiet.edu
    
    Best regards,
    IEEE KIET Student Branch Team
  `;

  console.log('Confirmation email to applicant:', emailContent);
  
  // Example with SendGrid:
  // await sgMail.send({
  //   to: application.email,
  //   from: 'ieee.kiet@kiet.edu',
  //   subject: 'IEEE KIET Membership Application Received',
  //   text: emailContent,
  // });
}
