import * as Joi from 'joi';

export const validation = Joi.object({
  // #APP
  NODE_ENV: Joi.string().required(),
  PORT: Joi.string()
    .trim()
    .regex(/^[0-9]+$/)
    .max(5)
    .optional(),
  APP_PORT: Joi.string()
    .trim()
    .regex(/^[0-9]+$/)
    .max(5)
    .optional(),
  API_URL: Joi.string().required(),
  PRV_TEST: Joi.string().required(),
  PUB_TEST: Joi.string().required(),
  // #DB
  DB_TYPE: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.string()
    .trim()
    .regex(/^[0-9]+$/)
    .max(5)
    .required(),
});
