import express from 'express';
import controller from '../controller/product.controller.js';
import { upload } from '../helpers/upload.js';
const route = express.Router();

route
    .get('/', controller.all)
    .post('/create', upload.single('avatar') ,controller.registerProduct)
    .get('/by-id/:id', controller.getBy)
    .put('/update/:id', upload.single('avatar'), controller.update)
    .delete('/del/:id', controller.delete)
    .post('/search-user', controller.search)

export default route;