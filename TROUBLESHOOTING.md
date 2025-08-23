## MongoDB Connection Issues - Troubleshooting Guide

### Current Issue
The error `querySrv ENOTFOUND _mongodb._tcp.cluster0.shedtig.mongodb.net` indicates DNS resolution problems with MongoDB Atlas.

### Possible Solutions:

#### 1. **Check MongoDB Atlas Cluster Status**
- Login to [MongoDB Atlas](https://cloud.mongodb.com/)
- Verify your cluster `cluster0.shedtig.mongodb.net` is running
- Check if the cluster is paused (free tier clusters auto-pause after inactivity)

#### 2. **Network Access Configuration**
- In MongoDB Atlas dashboard, go to "Network Access"
- Add your current IP address to the IP Access List
- Or temporarily add `0.0.0.0/0` for testing (remove after testing!)

#### 3. **Database User Credentials**
- In MongoDB Atlas, go to "Database Access"
- Ensure user `abcd` exists and has read/write permissions
- Verify the password is correct
- Create a new user if needed

#### 4. **Alternative Connection String Formats**

Try these alternative connection strings in your `.env.local`:

**Option A: Standard Format**
```bash
MONGODB_URI=mongodb+srv://abcd:9mhLg9AikfJ2IK72@cluster0.shedtig.mongodb.net/?retryWrites=true&w=majority
```

**Option B: With Database Name**
```bash
MONGODB_URI=mongodb+srv://abcd:9mhLg9AikfJ2IK72@cluster0.shedtig.mongodb.net/ieee_kiet?retryWrites=true&w=majority
```

**Option C: Direct IP (if DNS fails)**
```bash
# You'll need to get the actual IP from MongoDB Atlas
MONGODB_URI=mongodb://abcd:9mhLg9AikfJ2IK72@<IP_ADDRESS>:27017/ieee_kiet?ssl=true
```

#### 5. **Test Connection Script**

Create a simple test file:

```javascript
// test-mongodb.js
const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = 'your-mongodb-uri-here';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected successfully');
    
    // Test database operation
    const db = client.db('ieee_kiet');
    await db.admin().ping();
    console.log('✅ Database ping successful');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await client.close();
  }
}

testConnection();
```

#### 6. **Email Configuration Fix**

Your email configuration looks correct. For Gmail:
- Enable 2-Factor Authentication
- Generate an App Password (not your regular password)
- Use the app password in `SMTP_PASS`

### Recommended Next Steps:

1. **Check MongoDB Atlas Dashboard** - Verify cluster is running
2. **Update IP Whitelist** - Add current IP address
3. **Test New Connection String** - Try Option A above
4. **Verify Database User** - Ensure credentials are correct
5. **Test Email** - The current setup should work once you use proper app password

### Fallback Options:

If MongoDB Atlas continues to fail:
1. **Local MongoDB**: Install MongoDB locally for development
2. **Alternative Cloud Provider**: Consider MongoDB Cloud or other providers
3. **Different Database**: Switch to PostgreSQL with Supabase or similar

Would you like me to help with any of these specific steps?
