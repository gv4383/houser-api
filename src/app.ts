import express, { Application } from 'express';
import cors from "cors" 

const app: Application = express();

app.use(express.json())
app.use(cors());

app.listen(5000, (): void => console.log('Listening on port 5000'));
