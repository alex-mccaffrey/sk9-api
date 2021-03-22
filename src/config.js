module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://alex-mcc@localhost/sk9",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || "postgresql://alex-mcc@localhost/sk9-test",
    // CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:8000/api",
};
