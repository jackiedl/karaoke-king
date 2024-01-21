import express from 'express';
import { PORT } from './ultis/config';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './database/db';
import cors from 'cors';

connectDB();

const app = express();
app.use(cors({
  credentials: true,
}));
app.use(express.json());

app.use('/api/songs', require('./routes/SongRoute'));
app.use('/api/users', require('./routes/UserRoute'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));