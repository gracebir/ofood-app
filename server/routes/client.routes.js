import express from 'express';
import controller from '../controller/user.controller.js';
import { upload } from '../helpers/upload.js';
import { checkIsAdmin, checkToken } from '../middlewares/users/auth.js';
const route = express.Router();

route
    .get('/', controller.all)
    .post('/login', controller.signIn)
    .post('/create', upload.single('avatar'), controller.createUser) 
    .get('/current-user', checkToken, controller.getCurrent)
    .get('/by-id/:id', controller.getBy)
    .put('/update/:id',upload.single('avatar'), checkToken, checkIsAdmin, controller.update)
    .delete('/del/:id', controller.delete)
    .post('/search-user', controller.search)

export default route;
