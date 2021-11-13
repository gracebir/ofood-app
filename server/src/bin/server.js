import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from '../config/routes';
import { sendSuccessResponse } from '../app/helpers/responses.helpers';
import { successCodes, failluresCodes } from '../app/helpers/statusCodes.helpers';
import { successMessages } from '../app/helpers/messages.helpers';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.urlencoded({extended:false}));

app.use(express.json());

const {ok} = successCodes;
const {welcome} = successMessages;
const {notFound} = failluresCodes;


app.get('/', (req,res)=>{
    sendSuccessResponse(res, ok, welcome, null, null)
})

app.use('/api', routes);
app.use('*',(req,res)=>{

    sendSuccessResponse(res, notFound, `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`)
})
const port = process.env.PORT || 3700;

app.listen(port,()=>{
    console.log(`server run on port ${port}...`)
})