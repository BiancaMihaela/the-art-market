import express from 'express';
import { loginUser,registerUser,adminLogin,getProfile, updateProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/profile',getProfile)
userRouter.put('/profile',updateProfile)

export default userRouter;