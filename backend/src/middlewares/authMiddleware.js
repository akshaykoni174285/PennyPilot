import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            return res.status(401).json({ message: 'User not found or token invalid' });
        }

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
    }
};


export default authMiddleware;
