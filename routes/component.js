mport express from 'express';
import { getComponents, addComponent } from '../controllers/componentController.js';

const router = express.Router();

router.get('/all', getComponents);
router.post('/add', addComponent);

export default router
