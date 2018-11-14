const config = require('./../config');
const AWS_CONFIG = config.get('aws');
const AWS = require('aws-sdk');

AWS.config.update({
    secretAccessKey: AWS_CONFIG.secretAccessKey,
    accessKeyId: AWS_CONFIG.accessKeyId,
    region: AWS_CONFIG.region
});
const s3 = new AWS.S3();
module.exports = {
    async uploadToS3(file) {
        const params = {
            Bucket: AWS_CONFIG.S3.bucketName,
            acl: 'public-read',
            Key: new Date() + 'export.csv',
            Body: file
        };
        return s3.upload(params).promise();
    }
};
