import express from 'express';
import { signup, login, getUserDetails } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', getUserDetails);

export default router;