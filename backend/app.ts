import express from 'express';
import loanRoutes from './routes/loanRoutes';

const app = express();

app.use(express.json()); // For parsing application/json
app.use(loanRoutes); // Use loan routes

export default app;
