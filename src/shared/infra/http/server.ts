import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import 'express-async-errors';

import routes from './shared/routes/index';
import uploadConfig from './config/upload';
import appError from './shared/errors/AppError';

import './shared/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
   if (err instanceof appError) {
      return response.status(err.statusCode).json({
         status: 'error',
         message: err.message,
      });
   }

   return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
   })
});

app.listen('3333', () => {
   console.log('🚀 server started on port 3333');
});
