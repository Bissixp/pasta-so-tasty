import express from 'express';
import path from 'path';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorHandlerMiddleware';
import loginRoute from './routes/loginRoute';
import registrationRoute from './routes/registrationRoute';
import recipeRoute from './routes/recipeRoute'
import cors from 'cors';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup(): void {
    this.app.use(express.json());
    this.app.use(cors());
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
