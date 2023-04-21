import * as dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.HTTP_PORT ? process.env.HTTP_PORT : 8080,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  PERSISTENCE:process.env.PERSISTENCE,
};

export default config;
