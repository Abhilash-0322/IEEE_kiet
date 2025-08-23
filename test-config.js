#!/usr/bin/env bun

// Test script to check MongoDB and email configuration
console.log('🔍 IEEE KIET Application System - Environment Check\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Configured' : '❌ Missing');
console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Configured' : '❌ Missing');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ Configured' : '❌ Missing');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? '✅ Configured' : '❌ Missing');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL ? '✅ Configured' : '❌ Missing');
console.log();

// Test MongoDB connection
if (process.env.MONGODB_URI) {
  console.log('🔗 Testing MongoDB Connection...');
  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ MongoDB connection successful');
    await client.close();
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    
    // Suggest fixes
    console.log('\n💡 Possible fixes:');
    console.log('1. Check if MongoDB Atlas cluster is running');
    console.log('2. Verify network access (IP whitelist)');
    console.log('3. Check username/password in connection string');
    console.log('4. Ensure database name is correct');
  }
} else {
  console.log('⚠️ MongoDB URI not configured - skipping connection test');
}

console.log();

// Test email configuration
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  console.log('📧 Testing Email Configuration...');
  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    await transporter.verify();
    console.log('✅ Email configuration is valid');
  } catch (error) {
    console.log('❌ Email configuration failed:', error.message);
    
    console.log('\n💡 Possible fixes:');
    console.log('1. Enable 2FA and use App Password for Gmail');
    console.log('2. Check if "Less secure app access" is enabled');
    console.log('3. Verify email and password are correct');
    console.log('4. Check SMTP host and port settings');
  }
} else {
  console.log('⚠️ Email credentials not configured - skipping email test');
}

console.log('\n🔧 Configuration Help:');
console.log('Create a .env.local file with:');
console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ieee_kiet');
console.log('SMTP_USER=your-email@gmail.com');
console.log('SMTP_PASS=your-app-password');
console.log('ADMIN_EMAIL=admin@example.com');
console.log('FROM_EMAIL=your-email@gmail.com');
