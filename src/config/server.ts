import { errorMiddleware } from './../middlewares/errorMiddleware';
import { routes } from './../routes/index';
import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errorMiddleware);
