import express from 'express';
import { loginUser,registerUser,registerArtist,adminLogin,getProfile, updateProfile, getArtists } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/registerArtist',registerArtist)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/profile',getProfile)
userRouter.get('/artists',getArtists)
userRouter.put('/profile',updateProfile)

export default userRouter;