"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const loanRoutes_1 = __importDefault(require("./routes/loanRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use routes
app.use('/api/loans', loanRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Example root route
app.get('/', (req, res) => {
    res.send('Welcome to the Credit App API!');
});
exports.default = app;
