import { Request } from 'express';
import User from '../models/User';

export interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}