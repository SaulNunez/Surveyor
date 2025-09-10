import express, { Application, Request, Response } from 'express';
import Options from './swagger'; 
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use('/api', userRoutes);
app.use(errorHandler);

const specs = swaggerJsdoc(Options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});