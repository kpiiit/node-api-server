import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import userRoutes from './routes/userRoutes';
import logger from './middleware/logger';

dotenv.config(); 
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB Atlas in index.ts:', err);
});
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(logger);
app.use('/api', userRoutes);
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB Atlas! 🚀');
});
app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ message: 'Internal server error' });
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
