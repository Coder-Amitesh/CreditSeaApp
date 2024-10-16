import express from 'express';
import loanRoutes from './routes/loanRoutes';

const app = express();

app.use(express.json()); 
app.use(loanRoutes); 

export default app;
