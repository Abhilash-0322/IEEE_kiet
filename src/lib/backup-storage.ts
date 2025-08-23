import fs from 'fs';
import path from 'path';

// Backup storage for applications when MongoDB is unavailable
export class BackupStorage {
  private backupDir: string;

  constructor() {
    this.backupDir = path.join(process.cwd(), 'backup-applications');
    this.ensureBackupDir();
  }

  private ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      console.log('📁 Created backup directory:', this.backupDir);
    }
  }

  async saveApplication(application: any): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `application-${timestamp}-${application.email.replace('@', '-at-')}.json`;
      const filepath = path.join(this.backupDir, filename);

      const backupData = {
        ...application,
        submittedAt: application.submittedAt.toISOString(),
        backupTimestamp: new Date().toISOString(),
        status: 'backup_pending_sync'
      };

      fs.writeFileSync(filepath, JSON.stringify(backupData, null, 2));
      console.log('💾 Application backed up to:', filename);
      
      return filename;
    } catch (error: any) {
      console.error('❌ Backup storage failed:', error.message);
      throw error;
    }
  }

  async listBackupApplications(): Promise<string[]> {
    try {
      const files = fs.readdirSync(this.backupDir);
      return files.filter(file => file.endsWith('.json'));
    } catch (error) {
      return [];
    }
  }

  async getBackupApplication(filename: string): Promise<any | null> {
    try {
      const filepath = path.join(this.backupDir, filename);
      const data = fs.readFileSync(filepath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  // Method to sync backup applications to MongoDB when it's available
  async syncToMongoDB(mongoCollection: any): Promise<{ synced: number; errors: string[] }> {
    const backupFiles = await this.listBackupApplications();
    let synced = 0;
    const errors: string[] = [];

    for (const filename of backupFiles) {
      try {
        const backupApp = await this.getBackupApplication(filename);
        if (backupApp && backupApp.status === 'backup_pending_sync') {
          
          // Restore Date object
          backupApp.submittedAt = new Date(backupApp.submittedAt);
          delete backupApp.backupTimestamp;
          delete backupApp.status;

          // Insert to MongoDB
          await mongoCollection.insertOne(backupApp);
          
          // Move backup file to synced folder
          const syncedDir = path.join(this.backupDir, 'synced');
          if (!fs.existsSync(syncedDir)) {
            fs.mkdirSync(syncedDir);
          }
          
          const oldPath = path.join(this.backupDir, filename);
          const newPath = path.join(syncedDir, filename);
          fs.renameSync(oldPath, newPath);
          
          synced++;
          console.log(`✅ Synced backup application: ${filename}`);
        }
      } catch (error: any) {
        errors.push(`${filename}: ${error.message}`);
        console.error(`❌ Failed to sync ${filename}:`, error.message);
      }
    }

    return { synced, errors };
  }
}
