import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from '#routes/auth.route.js';
import securityMiddleware from '#middleware/security.middleware.js';
import userRouter from '#routes/user.route.js';


const app = express();

app.use(helmet());
app.use(securityMiddleware);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions API!');
  res.status(200).send('Hello from Acquisitions!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
}); 

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Acquisitions API!' });
});

app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);

app.use((req, res) =>{
  res.status(404).json({ error: 'Not Found' });
});

export default app;
