import express from 'express';
import { addProduct, getProducts, checkProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);
router.get('/all', getProducts);
router.get('/check', checkProduct);

export default router;
