const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECREAT_ACCESS_KEY,
  region: process.env.S3_REGION,
});

exports.s3 = new AWS.S3();
