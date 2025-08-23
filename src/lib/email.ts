import nodemailer from 'nodemailer';

// Create email transporter with enhanced error handling
function createTransporter() {
  try {
    console.log('Creating email transporter...');
    console.log('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: !!process.env.SMTP_USER,
      pass: !!process.env.SMTP_PASS,
      secureMode: parseInt(process.env.SMTP_PORT || '587') === 465
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP credentials not configured');
    }

    const port = parseInt(process.env.SMTP_PORT || '587');
    const secure = port === 465;

    console.log(`Port ${port}, Secure mode: ${secure ? 'Yes' : 'No'}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      pool: true,
      maxConnections: 1,
      maxMessages: 5,
      rateDelta: 20000,
      rateLimit: 5,
      tls: {
        // Allow self-signed / corporate proxies; Gmail will still use valid certs
        rejectUnauthorized: false,
      },
      debug: true,
      logger: true,
    } as any);

    console.log('Email transporter created successfully');
    return transporter;
  } catch (error: any) {
    console.error('Failed to create email transporter:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}

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

// Send notification email to admin
export async function sendAdminNotification(application: MembershipApplication) {
  try {
    console.log('Attempting to send admin notification...');
    
    // Check if email is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.ADMIN_EMAIL) {
      console.warn('Email configuration incomplete. Skipping admin notification.');
      return { success: false, error: 'Email not configured' };
    }

    const transporter = createTransporter();
    
    const adminEmailContent = {
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: '🎓 New IEEE KIET Membership Application Received',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066CC, #004499); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .detail-row { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #0066CC; }
            .button { background: #0066CC; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎓 New IEEE KIET Membership Application</h2>
              <p>A new student has applied to join IEEE KIET Student Branch</p>
            </div>
            
            <div class="content">
              <div class="detail-row">
                <span class="label">Name:</span> ${application.firstName} ${application.lastName}
              </div>
              
              <div class="detail-row">
                <span class="label">Email:</span> ${application.email}
              </div>
              
              <div class="detail-row">
                <span class="label">Phone:</span> ${application.phone}
              </div>
              
              <div class="detail-row">
                <span class="label">Department:</span> ${application.department}
              </div>
              
              <div class="detail-row">
                <span class="label">Preferred IEEE Society:</span> ${application.society}
              </div>
              
              <div class="detail-row">
                <span class="label">Areas of Interest:</span><br>
                ${application.interests}
              </div>
              
              <div class="detail-row">
                <span class="label">Application Submitted:</span> ${new Date(application.submittedAt).toLocaleString()}
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 6px;">
                <h3 style="color: #0066CC; margin-top: 0;">Next Steps:</h3>
                <ul>
                  <li>Review the application details</li>
                  <li>Contact the applicant for interview scheduling</li>
                  <li>Send IEEE membership information</li>
                  <li>Add to IEEE KIET WhatsApp/Telegram group</li>
                </ul>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New IEEE KIET Membership Application Received
        
        Name: ${application.firstName} ${application.lastName}
        Email: ${application.email}
        Phone: ${application.phone}
        Department: ${application.department}
        Preferred IEEE Society: ${application.society}
        
        Areas of Interest:
        ${application.interests}
        
        Submitted: ${new Date(application.submittedAt).toLocaleString()}
        
        Please review and contact the applicant soon.
      `
    };

    console.log('Sending admin email to:', process.env.ADMIN_EMAIL);
    const result = await transporter.sendMail(adminEmailContent);
    console.log('[EMAIL][ADMIN] Sent:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response
    });
    return { success: true, messageId: result.messageId, accepted: result.accepted };
    
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error: error };
  }
}

// Send confirmation email to applicant
export async function sendApplicantConfirmation(application: MembershipApplication) {
  try {
    console.log('Attempting to send applicant confirmation...');
    
    // Check if email is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('Email configuration incomplete. Skipping applicant confirmation.');
      return { success: false, error: 'Email not configured' };
    }

    const transporter = createTransporter();
    
    const confirmationEmailContent = {
      from: process.env.FROM_EMAIL,
      to: application.email,
      subject: '🎉 Application Received - IEEE KIET Student Branch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066CC, #004499); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .welcome-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #0066CC; }
            .next-steps { background: #e8f4fd; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .contact-info { background: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to IEEE KIET!</h1>
              <p>Your application has been successfully received</p>
            </div>
            
            <div class="content">
              <div class="welcome-box">
                <h2>Dear ${application.firstName},</h2>
                <p>Thank you for your interest in joining <strong>IEEE KIET Student Branch</strong>! We're excited to review your application and potentially welcome you to our community of innovators and technology enthusiasts.</p>
              </div>
              
              <div class="next-steps">
                <h3 style="color: #0066CC; margin-top: 0;">📋 What Happens Next?</h3>
                <ul>
                  <li><strong>Application Review:</strong> Our team will review your application within 3-5 business days</li>
                  <li><strong>Interview:</strong> We may contact you for a brief interview to discuss your interests</li>
                  <li><strong>Welcome Package:</strong> Upon acceptance, you'll receive IEEE membership information and benefits</li>
                  <li><strong>Community Access:</strong> Join our exclusive IEEE KIET communication channels</li>
                </ul>
              </div>
              
              <div class="welcome-box">
                <h3 style="color: #0066CC;">🎯 Your Application Summary:</h3>
                <p><strong>Department:</strong> ${application.department}</p>
                <p><strong>Preferred Society:</strong> ${application.society}</p>
                <p><strong>Submission Date:</strong> ${new Date(application.submittedAt).toLocaleDateString()}</p>
              </div>
              
              <div class="contact-info">
                <h3 style="color: #0066CC; margin-top: 0;">📞 Contact Information</h3>
                <p>If you have any questions, feel free to reach out:</p>
                <p><strong>Email:</strong> ieee.kiet@kiet.edu</p>
                <p><strong>Website:</strong> IEEE KIET Student Branch</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #0066CC; font-weight: bold; font-size: 18px;">
                  "Advancing Technology for Humanity"
                </p>
                <p style="color: #666; font-style: italic;">
                  - IEEE Mission Statement
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Dear ${application.firstName},
        
        Thank you for your interest in joining IEEE KIET Student Branch!
        
        Your application has been successfully received and will be reviewed within 3-5 business days.
        
        Application Summary:
        - Department: ${application.department}
        - Preferred Society: ${application.society}
        - Submitted: ${new Date(application.submittedAt).toLocaleDateString()}
        
        What's Next:
        1. Application review by our team
        2. Possible interview to discuss your interests
        3. Welcome package with IEEE membership info
        4. Access to IEEE KIET community channels
        
        Contact us: ieee.kiet@kiet.edu
        
        IEEE KIET Student Branch
        "Advancing Technology for Humanity"
      `
    };

    const result = await transporter.sendMail(confirmationEmailContent);
    console.log('[EMAIL][APPLICANT] Sent:', {
      to: application.email,
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response
    });
    return { success: true, messageId: result.messageId, accepted: result.accepted };
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error };
  }
}

// Test email configuration
export async function testEmailConnection() {
  try {
    console.log('Testing email connection with detailed logging');
    console.log('Environment variables status:');
    console.log('- SMTP_HOST:', process.env.SMTP_HOST ? 'Set' : 'Not set');
    console.log('- SMTP_PORT:', process.env.SMTP_PORT ? 'Set' : 'Not set');
    console.log('- SMTP_USER:', process.env.SMTP_USER ? 'Set' : 'Not set');
    console.log('- SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Not set');
    console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? 'Set' : 'Not set');
    console.log('- FROM_EMAIL:', process.env.FROM_EMAIL ? 'Set' : 'Not set');
    
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return { 
        success: false, 
        error: 'Missing SMTP credentials. Please set SMTP_USER and SMTP_PASS in your .env.local file.' 
      };
    }
    
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email server connection successful');
    return { success: true };
  } catch (error: any) {
    console.error('Email server connection failed:', error);
    return { 
      success: false, 
      error: error,
      message: error.message || 'Unknown error',
      code: error.code || 'NO_CODE',
      responseCode: error.responseCode || 'NO_RESPONSE_CODE'
    };
  }
}
