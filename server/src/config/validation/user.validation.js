import joi from 'joi';
import { errorMessages } from '../../app/helpers/messages.helpers';
import { sendErrorResponse, sendSuccessResponse } from '../../app/helpers/responses.helpers';
import { failluresCodes } from '../../app/helpers/statusCodes.helpers';
import db from '../../app/models';

const {badRequest} = failluresCodes;
const {duplicatedEmail, duplicatedPhone, fieldValidation} = errorMessages;

const userValidations ={
    register: async(req, res, next)=>{
        const schema = joi.object({
            lsname: joi.string().alphanum().min(5).max(10).required(),
            fsname: joi.string().alphanum().min(5).max(10).required(),
            phone: joi.string().alphanum().min(10).max(13).required(),
            password: joi.string().alphanum().min(4).max(6).required(),
            email: joi.string().pattern(new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)).required(),
            avatar:joi.string().alphanum()
        })
        const {error} = schema.validate(req.body);
        if(error){
            return sendSuccessResponse(res, badRequest, `${error.details[0].message}`)
        }
        const checkPhone = await db.User.findOne({
            where:{
                phone: req.body.phone
            }
        }).then().catch(er=>console.error(er))
        if(req.body.email){
            const checkEmail = await User.findOne({
                where:{
                    email: req.body.email
                }
            })
            if(checkEmail){
                sendErrorResponse(res, badRequest, duplicatedEmail)
            }
        }
        if(checkPhone){
            sendErrorResponse(res, badRequest, duplicatedPhone)
        }else {
            return next();
        }
    },
    update: async (req, res, next)=>{
        const schema = joi.object({
            lsname: joi.string().alphanum().min(3).max(60).required(),
            fsname: joi.string().alphanum().min(3).max(60).required(),
            phone: joi.string().alphanum().min(10).max(13).required(),
            password: joi.string().alphanum().min(4).max(6).required(),
            email: joi.string().pattern(new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)).required()
        });
        const {error} = schema.validate(req.body);
        if(error){
            return sendErrorResponse(res, badRequest, fieldValidation)
        }else{
            return next();
        }
    },

}

export default userValidations;