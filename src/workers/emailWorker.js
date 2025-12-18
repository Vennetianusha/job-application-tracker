const { Worker } = require('bullmq');
const IORedis = require('ioredis');

// ✅ ADD THIS LINE AT THE VERY TOP
console.log('📨 Email worker started and waiting for jobs...');

// Redis connection (VERY IMPORTANT FIX)
const connection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null // ✅ REQUIRED for BullMQ
});

// Worker
const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    console.log('📧 Sending email...');
    console.log('Application ID:', job.data.applicationId);
    console.log('New Status:', job.data.newStatus);

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`✅ Email job ${job.id} completed`);
  },
  { connection }
);

// Optional error logging
emailWorker.on('failed', (job, err) => {
  console.error(`❌ Email job ${job.id} failed`, err);
});
