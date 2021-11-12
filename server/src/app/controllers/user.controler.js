
import { errorMessages, successMessages } from '../helpers/messages.helpers';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { failluresCodes, successCodes } from '../helpers/statusCodes.helpers';
import db from '../models';

const {ok} = successCodes;
const {recordFound} = successMessages;
const {noRecordFound, interError} = errorMessages;
const {notFound, internalServerError} = failluresCodes;

export default {
    register: async (req, res)=>{

    },
    login: async (req, res)=>{

    },
    view: async (req, res)=>{
        try {
            const viewAll = await db.User.findAll({
                where: {
                    datastatus: process.env.DEACTIVED
                }
            });
            if(viewAll.length !== 0){
                sendSuccessResponse(re, ok, recordFound,null, viewAll);
            }else{
                sendErrorResponse(res,notFound, noRecordFound );
            }
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    update: async(req, res)=>{

    },
    viewById: async(req, res)=>{

    }
}