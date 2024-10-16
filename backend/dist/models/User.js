"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const mongoose_1 = require("mongoose");
// Create a user schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['User', 'Verifier', 'Admin'], default: 'User' }, // Enforce enum
});
// Create a user model
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
