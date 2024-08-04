import express from 'express';
import { addProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);
router.get('/all', getProducts);

export default router;
