"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByRole = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User")); // Ensure to import IUser for type safety
// Get all users (for Admin Dashboard)
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server Error');
    }
});
exports.getUserById = getUserById;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, role } = req.body; // Ensure role is typed as IUser
    try {
        const newUser = new User_1.default({
            name,
            email,
            phone,
            role: role || 'User', // Default role to 'User'
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server Error');
    }
});
exports.createUser = createUser;
// Update user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone, role } = req.body; // Ensure role is typed as IUser
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, { name, email, phone, role }, { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server Error');
    }
});
exports.updateUser = updateUser;
// Delete user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(204).send(); // No content to send back
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Server Error');
    }
});
exports.deleteUser = deleteUser;
// Get users by role (for Admin Dashboard)
const getUsersByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.params;
    // Ensure the role is valid
    if (!['User', 'Verifier', 'Admin'].includes(role)) {
        return res.status(400).send('Invalid role');
    }
    try {
        // Use role as a string literal type
        const users = yield User_1.default.find({ role: role }); // Cast role to the correct type
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users by role:', error);
        res.status(500).send('Server Error');
    }
});
exports.getUsersByRole = getUsersByRole;
exports.default = {
    getAllUsers: exports.getAllUsers,
    getUserById: exports.getUserById,
    createUser: exports.createUser,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
    getUsersByRole: exports.getUsersByRole,
};
