import express from 'express';
import { register,login,getMe} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();
// all routes for the auth routes
router.post('/register', register);

router.post('/login', login);



// router.post('/logout',authMiddleware, logout);

router.get('/me',authMiddleware, getMe);

export default router;