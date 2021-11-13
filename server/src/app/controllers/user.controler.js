
import db from '../models';
// import dateFormat from 'dateformat';
import dotenv from 'dotenv';
import { errorMessages, successMessages } from '../helpers/messages.helpers';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { failluresCodes, successCodes } from '../helpers/statusCodes.helpers';
import {generateToken} from '../helpers/token.helpers';
import bcrypt from 'bcrypt';

dotenv.config();
const {ok, created,noContent} = successCodes;
const {recordFound,accountCreate, loginSuccess,updateSuccess} = successMessages;
const {noRecordFound, interError,accountFailedToCreate, loginFail,fieldValidation,updateFail} = errorMessages;
const {notFound, internalServerError,badRequest,unAuthorized, forbidden} = failluresCodes;

export default {
    register: async(req, res)=>{
        let {fsname, lsname, email, phone,avatar, password, datastatus, role} = req.body;
        console.log(req.body);
        if(!fsname || !lsname || !email || !phone || !password || !avatar) return sendErrorResponse(res,unAuthorized,fieldValidation)
       // hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        try {      
            const isCreated = await db.User.create({
                fsname,
                lsname,
                email,
                phone,
                password:passwordHash,
                avatar,
                datastatus: process.env.STATUS,
                role: process.env.DEACTIVED
            });
            if(isCreated){
                sendSuccessResponse(res, created, accountCreate, generateToken(JSON.stringify(isCreated.id)), isCreated);
            } 
            else sendErrorResponse(res, badRequest, accountFailedToCreate)
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError )
        }
    },
    login: async(req, res)=>{
        const {password, email, phone} = req.body;
        try {
            if(email || phone && password){            
                if(email){
                    const isSignIn = await db.User.findOne({
                        where: {
                            email:email,
                            password:password,
                            datastatus: process.env.STATUS
                        }
                    })
                    
                    if(isSignIn){
                        bcrypt.compare(password, isSignIn.password, (err, result)=>{
                            if(result) sendSuccessResponse(res, ok, loginSuccess, generateToken(JSON.stringify(isSignIn.id)),isSignIn);
                            else sendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password:req.body.password});
                        })
                    }
                }else if(phone){
                    const isSignIn = await db.User.findOne({
                        where: {
                            phone:phone,
                            datastatus: process.env.STATUS
                        }
                    })
                    if(isSignIn){
                        bcrypt.compare(password, isSignIn.password, (err, result)=>{
                            if(result) sendSuccessResponse(res, ok, loginSuccess, generateToken(JSON.stringify(isSignIn.id)),isSignIn);
                            else sendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password:req.body.password});
                        })
                    }else sendSuccessResponse(res, forbidden, loginFail, null,{email: req.body.email, password:req.body.password})
                }
            } else sendErrorResponse(res,forbidden, fieldValidation)
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    view: async(req, res)=>{
        try {
            const viewAll = await db.User.findAll({
                where:{datastatus:process.env.DEACTIVED},
            })
            if(viewAll.length !==0){
                sendSuccessResponse(res, ok, recordFound, null, viewAll)
            }else{
                sendErrorResponse(res, notFound, noRecordFound)
            }
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    update: async(req, res)=>{
        const id = req.params.id;
        const {fsname, lsname, email, phone,avatar, datastatus} = req.body;
        try {
            const user = await db.User.findOne({
                where: {id:id}
            })
            const isUpdated = await user.update({
                fsname: fsname || user.fsname,
                lsname: lsname || user.lsname,
                email: email || user.email,
                phone: phone || user.phone,
                datastatus: datastatus || user.datastatus
            })
            if(isUpdated) sendSuccessResponse(res, ok, updateSuccess, null, isUpdated);
            else sendErrorResponse(res, badRequest, updateFail)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    viewById: async(req, res)=>{
        const id = req.params.id;
        try {
            const isDone = await db.User.findOne({
                where: {id: id}
            })
            if(isDone) sendSuccessResponse(res, ok, recordFound, null, isDone);
            else sendErrorResponse(res, notFound, noRecordFound);
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    }
}