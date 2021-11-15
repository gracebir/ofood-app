import express from 'express';
import controller from '../controller/product.controller.js';
const route = express.Router();

route
    .get('/', controller.all)
    .post('/create', controller.registerProduct)
    .get('/by-id/:id', controller.getBy)
    .put('/update/:id', controller.update)
    .delete('/del/:id', controller.delete)
    .post('/search-user', controller.search)

export default route;