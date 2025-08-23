// This script will test your email configuration and MongoDB connection
const readline = require('readline');
const fs = require('fs');
const nodemailer = require('nodemailer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function testEmailConfig() {
  console.log('\n===== Email Configuration Test =====');
  
  try {
    // Get current config from .env.local if it exists
    let currentConfig = {};
    try {
      const envContent = fs.readFileSync('.env.local', 'utf8');
      envContent.split('\n').forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, value] = line.split('=');
          if (key && value) {
            currentConfig[key.trim()] = value.trim();
          }
        }
      });
    } catch (err) {
      console.log('No existing .env.local file found or could not read it.');
    }
    
    // Get email configuration from user
    console.log('Please enter your email configuration details:');
    const smtpHost = await question(`SMTP Host (default: ${currentConfig.SMTP_HOST || 'smtp.gmail.com'}): `);
    const smtpPort = await question(`SMTP Port (default: ${currentConfig.SMTP_PORT || '587'}): `);
    const smtpUser = await question(`SMTP Username/Email (default: ${currentConfig.SMTP_USER || ''}): `);
    const smtpPass = await question(`SMTP Password/App Password (required): `);
    const adminEmail = await question(`Admin Email (default: ${currentConfig.ADMIN_EMAIL || ''}): `);
    const fromEmail = await question(`From Email (default: ${currentConfig.FROM_EMAIL || smtpUser || ''}): `);
    
    // Use defaults or current values if not provided
    const config = {
      host: smtpHost || currentConfig.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort || currentConfig.SMTP_PORT || '587',
      user: smtpUser || currentConfig.SMTP_USER || '',
      pass: smtpPass || currentConfig.SMTP_PASS || '',
      admin: adminEmail || currentConfig.ADMIN_EMAIL || '',
      from: fromEmail || currentConfig.FROM_EMAIL || smtpUser || ''
    };
    
    if (!config.user || !config.pass) {
      throw new Error('SMTP username and password are required!');
    }
    
    console.log('\nTesting email configuration...');
    
    // Create a test transporter
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: parseInt(config.port),
      secure: parseInt(config.port) === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      }
    });
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email server connection successful!');
    
    // Send a test email
    const testEmail = await question(`\nWould you like to send a test email? (yes/no): `);
    
    if (testEmail.toLowerCase() === 'yes') {
      const testEmailAddress = await question('Enter the email address to send the test to: ');
      
      const info = await transporter.sendMail({
        from: config.from || config.user,
        to: testEmailAddress,
        subject: 'Test Email from IEEE KIET Website',
        text: 'This is a test email from your IEEE KIET website to verify email functionality.',
        html: '<h1>Test Email</h1><p>This is a test email from your IEEE KIET website to verify email functionality.</p>',
      });
      
      console.log('✅ Test email sent successfully!');
      console.log('Message ID:', info.messageId);
    }
    
    // Save configuration to .env.local
    const saveConfig = await question('\nWould you like to save this configuration to .env.local? (yes/no): ');
    
    if (saveConfig.toLowerCase() === 'yes') {
      // Preserve existing variables
      let envContent = '';
      for (const [key, value] of Object.entries(currentConfig)) {
        if (!key.startsWith('SMTP_') && key !== 'ADMIN_EMAIL' && key !== 'FROM_EMAIL') {
          envContent += `${key}=${value}\n`;
        }
      }
      
      // Add email configuration
      envContent += `SMTP_HOST=${config.host}\n`;
      envContent += `SMTP_PORT=${config.port}\n`;
      envContent += `SMTP_USER=${config.user}\n`;
      envContent += `SMTP_PASS=${config.pass}\n`;
      envContent += `ADMIN_EMAIL=${config.admin}\n`;
      envContent += `FROM_EMAIL=${config.from}\n`;
      
      fs.writeFileSync('.env.local', envContent);
      console.log('✅ Configuration saved to .env.local');
    }
    
    console.log('\n===== Email Configuration Test Complete =====');
    
    return true;
  } catch (error) {
    console.error('❌ Email configuration test failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('===== IEEE KIET Website Configuration Test =====');
  
  try {
    await testEmailConfig();
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    rl.close();
  }
}

main();
