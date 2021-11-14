import Product from "../model/product.js";
import { errorMessages, successMessages } from "../helpers/messages.helper.js";
import { sendErrorResponse, sendSuccessResponse } from "../helpers/response.helper.js";
import { failureCodes, successCodes } from "../helpers/statusCodes.helper.js";
import { generateToken } from "../helpers/token.helper.js";
import onConnexion from "../services/connexion.js";


const {created, ok} =successCodes;
const {  unAuthorized,notFound, conflict,internalServerError,forbidden } = failureCodes;
const { productCreated } = successMessages;
const {  noRecordFound,loginFail,passwordFail, diplicated,updateFail,interError, userFailedToUpdate, userFailedToRetrait, userFailedToSolde, RetraitToUseAssignmentFail } = errorMessages;

export default {
    registerProduct: async (req,res)=>{
        const { name, alt, desc, categorie, avatar, datastatus, date, button} = req.body;
        const transaction = await onConnexion.transaction();

        try {
            let filename = "productdefault.pjg";
            if(req.files && req.files.avatar){
                const img = req.files.avatar; const _ = img.name; 
                const ext = _.substring(_.lastIndexOf(".")).toLowerCase();
                filename = encdec.randomstring().concat(ext);
                img.mv('assets/imgs/'+ filename, err => {
                    if(err) filename = "productdefault.pjg"
                })
            }
            const product = await Product.create({
                datastatus : process.env.STATUS,
                name, 
                alt, 
                desc,
                categorie,
                date: "default",
                avatar: filename,
                button: "Details"
            }, {transaction});
            if(product instanceof Product){
                transaction.commit();
                sendSuccessResponse(res, created,productCreated, null, product);
            }else sendSuccessResponse(res, conflict, diplicated, null, product);
           
        } catch (error) {
            transaction.rollback();
            console.log(error);
            sendSuccessResponse(res, conflict, diplicated, null, error);
        }
    }
}