'use strict';

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
// import router from './routes/index,js';
import  UploadedFile  from 'express-fileupload';
import cors from 'cors';
import { Server } from 'http';

dotenv.config();

const PORT = process.env.PORT || 3700;

app.use(cors())
app.use(express.urlencoded({extended:true, limit: '5mb'}));
app.use(express.json({limit:'5mb'}));

app.use(express.static('assets'));
app.use(UploadedFile());

// app.use('/api', router);
app.get('/', (req,res)=>{
    res.status(200).json({status:200, message:"Welcome to somba API"})
})
app.get('/resource/:resources', (req, res, next)=>{
    const rss =(req.params['resources']);
    res
        .status(200)
        .sendFile(path.resolve(`assets/imgs/${rss}`));
        // next
})

app.use((req, res, next)=>{
    res
    .status(400)
    .json({status:400, message: "Il n'y a aucune route trouve" + req.path})
    next();
})

app.listen(PORT, ()=>{
    console.log(`somba is running on port ::: ${PORT}`)
});