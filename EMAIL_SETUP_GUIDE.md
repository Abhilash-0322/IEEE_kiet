# Email Setup Guide for IEEE KIET Website

## 📧 Email Functionality Overview

The IEEE KIET website now includes automated email notifications for membership applications:

### Features:
- ✅ **Admin Notifications**: Automatic email to IEEE admin when new applications are submitted
- ✅ **Applicant Confirmations**: Professional confirmation emails sent to applicants
- ✅ **Database Storage**: All applications are stored in MongoDB
- ✅ **Professional Templates**: Well-designed HTML email templates

---

## 🛠️ Setup Instructions

### 1. **Email Configuration**

You need to configure email settings in your `.env.local` file:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=ieee.kiet@kiet.edu
FROM_EMAIL=ieee.kiet@gmail.com
```

### 2. **Gmail Setup (Recommended)**

For Gmail, you need to:

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Google Account > Security > App passwords
   - Generate a new app password for "Mail"
   - Use this 16-character password as `SMTP_PASS`

3. **Update Environment Variables**
   ```bash
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

### 3. **Alternative Email Services**

#### **SendGrid (Professional)**
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### **Outlook/Hotmail**
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

---

## 🧪 Testing Email Configuration

### Test the email setup:
```bash
# Visit this URL to test email configuration
http://localhost:3001/api/test-email
```

Expected response:
```json
{
  "success": true,
  "message": "Email configuration is working correctly!"
}
```

---

## 📨 Email Templates

### **Admin Notification Email**
- 🎓 Professional IEEE-branded template
- 📋 Complete application details
- 📞 Next steps checklist
- 🎯 Action items for follow-up

### **Applicant Confirmation Email**
- 🎉 Welcome message
- ✅ Application confirmation
- 📋 What happens next
- 📞 Contact information

---

## 🔍 How It Works

1. **Student submits application** on `/join-us` page
2. **Data is stored** in MongoDB database
3. **Admin receives email** with application details
4. **Student receives confirmation** email immediately
5. **Both emails are professional** IEEE-branded templates

---

## 🚨 Important Notes

### **Security:**
- Never commit actual email credentials to Git
- Use environment variables for all sensitive data
- Use App Passwords, not regular passwords for Gmail

### **Production:**
- Consider using professional email services like SendGrid
- Set up proper domain-based email addresses
- Monitor email delivery rates

### **Troubleshooting:**
- Check firewall settings for SMTP ports
- Verify credentials are correct
- Test with `/api/test-email` endpoint
- Check server logs for detailed error messages

---

## 📊 Current Status

✅ **Working Features:**
- MongoDB storage
- Email notifications
- Professional templates
- Error handling

🔧 **To Configure:**
- Update email credentials in `.env.local`
- Test email functionality
- Update admin email address

---

## 📞 Support

If you need help setting up email:
1. Check the error logs in the terminal
2. Test with `/api/test-email`
3. Verify your email service settings
4. Ensure proper environment variables are set
