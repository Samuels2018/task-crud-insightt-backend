import {body} from 'express-validator';

export const createTaskValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  //body('status').isBoolean().withMessage('Status must be a boolean value')
]