import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/User'; // Ensure to import IUser for type safety

// Get all users (for Admin Dashboard)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
};

// Get user by ID
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

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, phone, role }: IUser = req.body; // Ensure role is typed as IUser

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

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, role }: IUser = req.body; // Ensure role is typed as IUser

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, phone, role },
      { new: true } // Return the updated document
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

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Server Error');
  }
};

// Get users by role (for Admin Dashboard)
export const getUsersByRole = async (req: Request, res: Response) => {
    const { role } = req.params;
  
    // Ensure the role is valid
    if (!['User', 'Verifier', 'Admin'].includes(role)) {
      return res.status(400).send('Invalid role');
    }
  
    try {
      // Use role as a string literal type
      const users = await UserModel.find({ role: role as 'User' | 'Verifier' | 'Admin' }); // Cast role to the correct type
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
