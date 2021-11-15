import Product from "../model/product.js";
import { errorMessages, successMessages } from "../helpers/messages.helper.js";
import { sendErrorResponse, sendSuccessResponse } from "../helpers/response.helper.js";
import { failureCodes, successCodes } from "../helpers/statusCodes.helper.js";
import { generateToken } from "../helpers/token.helper.js";
import onConnexion from "../services/connexion.js";


const {created, ok} =successCodes;
const {  notFound, conflict,internalServerError } = failureCodes;
const { productCreated, recordFound,updateSuccess  } = successMessages;
const {  noRecordFound, diplicated,updateFail,interError} = errorMessages;

export default {
    registerProduct: async (req,res)=>{
        const { name, qty, desc, categorie, price, avatar, datastatus, date, button} = req.body;
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
                qty, 
                desc,
                categorie,
                price,
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
    },
    all: async (req, res)=>{
        Product.findAll(
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
        Product.findOne({where:{id:id}})
        .then((data)=>{
            if(data){
                sendSuccessResponse(res, ok, recordFound, null, data);
            }else{
                sendErrorResponse(res,notFound,noRecordFound);
            }
        })
    },
    update : async (req,res)=>{
        let id = req.params.id;
        Product.update(req.body, {
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
        await Product.destroy(
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
            const product = await Product.findAndCountAll({
                where: {
                    [ Op.or ]: [
                        { id_: {[ Op.substring ]: query} },
                        { phone: { [ Op.substring ]: query } },
                        {createdon: { [ Op.substring ]: query}},
                    ]
                }
            })
            if(product){
                sendSuccessResponse(res, ok,recordFound,null,product);
            }else sendErrorResponse(res, notFound, noRecordFound); 
        } catch (error) {
            sendErrorResponse(res,internalServerError,interError);
        }
    }
}