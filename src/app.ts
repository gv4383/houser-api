import express, { Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import router from './routes';

config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(5000, (): void => console.log('Listening on port 5000'));
