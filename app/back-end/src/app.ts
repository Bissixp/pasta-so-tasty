import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorHandlerMiddleware';
import loginRoute from './routes/loginRoute';
import registrationRoute from './routes/registrationRoute';
import recipeRoute from './routes/recipeRoute';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    };

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(accessControl);
    this.app.use('/uploads', express.static('./uploads'));

    this.routes();
    this.errorHandler();
  }

  private routes(): void {
    this.app.use('/login', loginRoute);
    this.app.use('/registration', registrationRoute);
    this.app.use('/recipe', recipeRoute);
  }

  private errorHandler(): void {
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };
