import 'reflect-metadata';

import 'dotenv/config';

import 'express-async-errors';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import appConfig from '../../../config/appConfig';
import '../../containers';
import connect from '../database/mongodb/mongoose/connection';
import AppError from './errors/AppError';
import routes from './routes';

const { appPort } = appConfig;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err: any, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.code).json({
      type: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({ message: 'Internal server error!' });
});

app.listen(Number(appPort), async () => {
  await connect();
  console.log(`Server started on port: ${appPort}`);
});
