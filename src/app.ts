import "reflect-metadata"
import "express-async-errors"
import express, { Request, Response, NextFunction } from "express"
import sessionRoutes from "./routes/sessions.routes";
import userRoutes from "./routes/users.routes";
import { AppError } from "./errors/appError";
import categoriesRouter from "./routes/categories.routes";
import propertiesRouter from "./routes/properties.routes";
import schedulesRouter from "./routes/schedules.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";


const app = express();
app.use(express.json());

app.use('/users',userRoutes);
app.use('/login', sessionRoutes);
app.use('/categories', categoriesRouter);
app.use('/properties', propertiesRouter);
app.use('/schedules', schedulesRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  };
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});


export default app