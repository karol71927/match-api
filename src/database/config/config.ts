import { DatabaseEnvironmentVariables } from './database.environment-variables';

export default (env = process.env): DatabaseEnvironmentVariables => {
  return {
    DB_HOST: env.DB_HOST,
    DB_PORT: env.DB_PORT,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_USERNAME: env.DB_USERNAME,
    DB_NAME: env.DB_NAME,
  };
};
