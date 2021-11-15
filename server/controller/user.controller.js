import User from "../model/user.js";
import { errorMessages, successMessages } from "../helpers/messages.helper.js";
import { sendErrorResponse, sendSuccessResponse } from "../helpers/response.helper.js";
import { failureCodes, successCodes } from "../helpers/statusCodes.helper.js";
import { generateToken } from "../helpers/token.helper.js";
import encdec from '../helpers/passwordEncDec.helper.js';
import bcrypt from 'bcrypt';
import onConnexion from "../services/connexion.js";
import { sendPasswordEmailContent } from "../helpers/mailMessageContent.js";
import sendEmail from "../helpers/sendMail.js";
import pkg from 'sequelize';
const { Op } = pkg;

const {created, ok} =successCodes;
const {  unAuthorized,notFound, conflict,internalServerError,forbidden } = failureCodes;
const { accountCreated, recordFound, loginSuccess,updateSuccess,approveEmailAddressToAdmin, RetraitSuccess } = successMessages;
const {  noRecordFound,loginFail,passwordFail, diplicated,updateFail,interError, userFailedToUpdate, userFailedToRetrait, userFailedToSolde, RetraitToUseAssignmentFail } = errorMessages;
const { SUPERADMIN_FNAME, SUPERADMIN_LNAME, FRONTEND_APP_URL, SUPERADMIN_EMAIL } = process.env
export default {
    // function doing connection of user
    createUser: async(req,res)=>{
        const { role, email, fsname, lsname, phone, pwd} = req.body;
        const passwordRandom = function getRandomNumber(len){
            var len = len;
            var num=[];
            for(let i=0;i<=len;i++){
                num.push(Math.floor(Math.random() * len));
            }
            return num.join('');
        };
        const brutpassword = passwordRandom(4);
        const password = await encdec.encryptPassword(brutpassword);
        const transaction = await onConnexion.transaction();

        try {
            let filename = "userprofile.png";
            if(req.files && req.files.avatar){
                const img = req.files.avatar; const _ = img.name; 
                const ext = _.substring(_.lastIndexOf(".")).toLowerCase();
                filename = encdec.randomstring().concat(ext);
                img.mv('assets/imgs/'+ filename, err => {
                    if(err) filename = "userprofile.png"
                })
            }
            const user = await User.create({
                datastatus : process.env.STATUS,
                email, 
                fsname, 
                lsname,
                phone,
                pwd: password,
                avatar: filename,
                role: process.env.DEACTIVED
            }, {transaction});
            if(user instanceof User){
                user.pwd = brutpassword;
                const {
                    EmailContentHTML,
                    EmailContentPlainText
                } =  sendPasswordEmailContent(user)
                await sendEmail({
                    mailSentTo: user.email,
                    mailSubject: 'Enregistrement Réussi ✔',
                    contentHTML: EmailContentHTML,
                    contentText: EmailContentPlainText,
                })
                transaction.commit();

                sendSuccessResponse(res, created, accountCreated, generateToken(JSON.stringify(email)), user);
            }else sendSuccessResponse(res, conflict, diplicated, null, {email, phone});
           
        } catch (error) {
            transaction.rollback();
            console.log(error);
            sendSuccessResponse(res, conflict, diplicated, null, error);
        }
            
    },
    signIn: async (req, res ) => {
        const { pwd, email } = req.body;
        console.log(req.body)
        console.log(email);
        await User.findOne({
            where: {
                email: email,
                datastatus: process.env.STATUS
            }
        })
        .then(user => {
            if(user instanceof User){
                bcrypt.compare(req.body.pwd, user.pwd, (err, result) => {
                    if(result) sendSuccessResponse(res, ok, loginSuccess,generateToken(user.id), user);
                    else sendSuccessResponse(res, unAuthorized, loginFail,null, {phone: req.body.phone, pwd: req.body.pwd})
                })
            } else sendSuccessResponse(res, unAuthorized, loginFail,null, {phone: req.body.phone, pwd: req.body.pwd})
        })
        .catch(error => {
            sendSuccessResponse(res, internalServerError, loginFail,null, error)
        })
    },
    // function getting all users
    all: async (req, res)=>{
        User.findAll(
            {
                where: {
                    datastatus: process.env.STATUS
                    
                }
            }
        )
        .then((data)=>{
            if(data){
                sendSuccessResponse(res,ok,recordFound,null, data);
            }else{
                sendErrorResponse(res, notFound, noRecordFound);
            }
        })
    },
    getBy : async (req, res)=>{
        const id = req.params.id;
        User.findOne({where:{id:id}})
        .then((data)=>{
            if(data){
                sendSuccessResponse(res, ok, recordFound, null, data);
            }else{
                sendErrorResponse(res,notFound,noRecordFound);
            }
        })
    },
    getCurrent: async(req, res) =>{
        const user = req.user;
        sendSuccessResponse(res, 200, 'ok', null, user);
    },
    update : async (req,res)=>{
        let id = req.params.id;
        User.update(req.body, {
            where: {id:id}
        })
        .then((data)=>{
            if(data){
                sendSuccessResponse(res, ok, updateSuccess,null, data)
            }else{
                sendErrorResponse(res,internalServerError,updateFail)
            }
        })
    },
    delete : async (req,res)=>{
        const id = req.params.id;
        await User.destroy(
            {where: {id : id}})
        .then((data)=>{
            if(data === null){
                res.status(500).json({msg:"Impossible de supprimer cet agent"})
            }else{
                res.status(200).json({msg:"suppression reussie",data})
            }
        })
        .catch(err=>res.status(400).json({msg:"Erreur lors de la suppression",err}))
    },
    // function update sold user and client
    search: async (req,res)=>{
        const { query } = req.body;
        try {
            const user = await User.findAndCountAll({
                where: {
                    [ Op.or ]: [
                        { id_: {[ Op.substring ]: query} },
                        { phone: { [ Op.substring ]: query } },
                        {createdon: { [ Op.substring ]: query}},
                    ]
                }
            })
            if(user){
                sendSuccessResponse(res, ok,recordFound,null,user);
            }else sendErrorResponse(res, notFound, noRecordFound); 
        } catch (error) {
            sendErrorResponse(res,internalServerError,interError);
        }
    }

}