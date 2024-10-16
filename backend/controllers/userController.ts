import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/User'; 

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server Error');
  }
};


export const createUser = async (req: Request, res: Response) => {
  const { name, email, phone, role }: IUser = req.body; 

  try {
    const newUser = new UserModel({
      name,
      email,
      phone,
      role: role || 'User', // Default role to 'User'
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server Error');
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, role }: IUser = req.body; 

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, phone, role },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Server Error');
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Server Error');
  }
};

export const getUsersByRole = async (req: Request, res: Response) => {
    const { role } = req.params;
  
    
    if (!['User', 'Verifier', 'Admin'].includes(role)) {
      return res.status(400).send('Invalid role');
    }
  
    try {
      
      const users = await UserModel.find({ role: role as 'User' | 'Verifier' | 'Admin' }); 
      res.json(users);
    } catch (error) {
      console.error('Error fetching users by role:', error);
      res.status(500).send('Server Error');
    }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRole,
};
