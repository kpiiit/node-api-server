import { Request, Response, NextFunction, RequestHandler } from 'express';
import { User, IUser } from '../models/User';

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.find().lean();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body as { name: string; email: string };

    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required.' });
      return;
    }
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      res.status(409).json({ message: 'Email already in use.' });
      return;
    }

    const newUser: IUser = new User({ name, email });
    const saved = await newUser.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
};
