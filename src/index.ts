import express, { Application, Request, Response } from 'express';
import Options from './swagger'; 
import errorHandler from './middlewares/errorHandler';
import moongose from 'mongoose';
import surveyRoutes from './routes/surveyRoutes';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

const app: Application = express();
const port: number = 3000;

if(!process.env.MONGO_CONNECTION_STRING) {
  console.error("MONGO_CONNECTION_STRING is not defined, thus can't connect to database, exiting...");
  process.exit(1);
}
moongose.connect(process.env.MONGO_CONNECTION_STRING);

app.use(express.json());
app.use('/api', surveyRoutes);
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