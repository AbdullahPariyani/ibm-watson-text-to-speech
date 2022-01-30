require('dotenv').config()
const AWS = require('aws-sdk');

//GET AWS CONFIG
const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION
}

//S3 CONFIG
const s3 = new AWS.S3(credentials)

class FileManager {
    async getPublicUrl(fileName) {

        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Expires: process.env.AWS_SIGNED_URL_EXPIRE_TIME * 60 || 60 * 60 // time in seconds: e.g. 60 * 5 = 5 mins
        })
        return url;
    }
    async upload(args) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: args.Key,
                Body: args.Body
            }
            return await s3.upload(params).promise();
        } catch (e) {
            console.log('s3 error', e);
            return false;
        }
    }
}

module.exports = FileManager
