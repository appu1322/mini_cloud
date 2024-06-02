import { Router } from 'express';
import { contactController, uploadController } from '../controllers'

const router = Router();

router.use('/contacts', contactController);
router.use('/upload', uploadController);

export { router };
