import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

interface User {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    logged: boolean;
  };
  iat: number;
  exp: number;
}


declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, secret) as User;
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication token.' });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.data.role;
  if (userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. You are not an administrator.' });
  }
};

export { authenticateMiddleware, isAdmin };