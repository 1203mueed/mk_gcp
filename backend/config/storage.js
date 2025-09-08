const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = process.env.STORAGE_BUCKET || 'your-project-uploads';
const bucket = storage.bucket(bucketName);

// Function to upload file to Cloud Storage
const uploadToCloudStorage = async (file, destination) => {
  try {
    const fileUpload = bucket.file(destination);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.error('Error uploading to Cloud Storage:', err);
        reject(err);
      });

      stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    console.error('Cloud Storage upload error:', error);
    throw error;
  }
};

// Function to delete file from Cloud Storage
const deleteFromCloudStorage = async (filePath) => {
  try {
    const fileName = filePath.split('/').pop();
    await bucket.file(fileName).delete();
    console.log(`File ${fileName} deleted from Cloud Storage`);
  } catch (error) {
    console.error('Error deleting from Cloud Storage:', error);
    throw error;
  }
};

module.exports = {
  storage,
  bucket,
  uploadToCloudStorage,
  deleteFromCloudStorage
};
