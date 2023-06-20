import * as express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorHandlerMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.use(errorMiddleware);
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

