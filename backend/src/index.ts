import express from 'express';
import userRoutes from './routes/userRoutes';
import subjectRoutes from './routes/subjectRoutes';
import lessonRoutes from './routes/lessonRoutes';
import downloadRoutes from './routes/downloadRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import materialRoutes from './routes/materialRoutes';
import lessonProgressRoutes from './routes/lessonProgressRoutes';
import progressRoutes from './routes/progressRoutes';
import questionRoutes from './routes/questionRoutes';
import achievementRoutes from './routes/achievementRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { initDB } from './database';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', subjectRoutes);
app.use('/api', lessonRoutes);
app.use('/api', downloadRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', materialRoutes);
app.use('/api', lessonProgressRoutes);
app.use('/api', progressRoutes);
app.use('/api', questionRoutes);
app.use('/api', achievementRoutes);
app.use('/api', dashboardRoutes);


initDB().then(() => {
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
});
