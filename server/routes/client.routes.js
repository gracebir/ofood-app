import express from 'express';
import controller from '../controller/user.controller.js';
import { checkIsAdmin, checkToken } from '../middlewares/users/auth.js';
const route = express.Router();

route
    .get('/', controller.all)
    .post('/login', controller.signIn)
    .post('/create', controller.createUser) 
    .get('/current-user', checkToken, controller.getCurrent)
    .get('/by-id/:id', controller.getBy)
    .put('/update/:id', checkToken, checkIsAdmin, controller.update)
    .delete('/del/:id', controller.delete)
    .post('/search-user', controller.search)

export default route;
