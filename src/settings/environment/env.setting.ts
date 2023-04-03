import { registerAs } from '@nestjs/config';

export const setting = registerAs('config', () => {
  return {
    app: {
      NODE_ENV: process.env.NODE_ENV,
      APP_PORT: process.env.APP_PORT,
    },
    database: {
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_NAME: process.env.DATABASE_NAME,
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      DATABASE_PORT: process.env.DATABASE_PORT,
      DATABASE_TYPE: process.env.DATABASE_TYPE,
      DATABASE_SSL: process.env.DATABASE_SSL,
    },
    api: {
      API_URL: process.env.API_URL,
      PRV_TEST: process.env.PRV_TEST,
      PUB_TEST: process.env.PUB_TEST,
    },
  };
});
