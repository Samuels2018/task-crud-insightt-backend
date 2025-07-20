// src/middlewares/auth.middleware.ts
import {Request,  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {DecodedToken} from '../types/userTypes';
import config from '../config/config'

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // 1) Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }


    if (!token) {
      return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
    }

    // 2) Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as DecodedToken;
    console.log('Decoded token:', decoded);
    if (!decoded) {
      return res.status(401).json({message: 'not decodificated'})
    }

    // 3) Check if user still exists (optional)
    // You can add this if you want to check if user still exists in DB

    // Add user ID to request object
    req.body = { id: decoded.id };

    next();
  } catch (err) {
    next(err);
  }
};