const config = {
    PORT: process.env.PROXY_SERVER_PORT || 7000,
    S3_BASE_URL: process.env.S3_BASE_URL || "https://vercel-outputs.s3.es-north-1.amazonaws.com/_ouput",
    DATABASE_URL: process.env.DATABASE_URL
};

module.exports = config;
