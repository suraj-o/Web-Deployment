const path = require('path');

const config = {
    AWS: {
        REGION: process.env.AWS_REGION || 'us-east-1',
        ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
        SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        BUCKET: process.env.AWS_S3_BUCKET || 'vercel-builder-outputs'
    },
    KAFKA: {
        CLIENT_ID: `docker-deployment-${process.env.DEPLOYMENT_ID}`,
        BROKERS: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
        USERNAME: process.env.KAFKA_USERNAME,
        PASSWORD: process.env.KAFKA_PASSWORD,
        MECHANISM: process.env.KAFKA_MECHANISM || 'scram-sha-256',
        CA_PATH: path.join(__dirname, 'ca.pem')
    },
    PROJECT_ID: process.env.PROJECT_ID,
    DEPLOYMENT_ID: process.env.DEPLOYMENT_ID
};

module.exports = config;
