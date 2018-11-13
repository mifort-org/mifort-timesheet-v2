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
    async uploadToS3(object) {
        const base64data = Buffer.from(JSON.stringify(object), 'binary');
        const params = {
            Bucket: AWS_CONFIG.S3.bucketName,
            Key: new Date() + '-export.csv',
            Body: base64data
        };
        return s3.upload(params).promise();
    }
};
