import express from 'express';
import userRoutes from './client.routes.js';
import productRoutes from './product.routes.js';

const router = express.Router();

router
    .use('/user', userRoutes)
    .use('/product', productRoutes )

export default router