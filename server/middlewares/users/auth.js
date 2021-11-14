import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../../helpers/response.helper.js';
import User from '../../model/user.js';


export function checkToken(req, res, next){
    const token = req.headers['authtoken'];

    jwt.verify(token, process.env.JWT_KEY, async(err, payload) =>{
        if(err){
            console.log(err);
            console.log('token', token);
            sendErrorResponse(res, 401, 'Veuillez vous connecter');
        }else{
            const user = await User.findOne({
                where: { id: payload.id }
            });
            if(user){
                req.user = user;
                next();
            }else{
                sendErrorResponse(res, 401, 'User unhautorized')
            }
        }
    })

};

export function checkIsAdmin(req, res, next){
    const user = req.user;
    if(user.role === 1){next()}else{
        sendErrorResponse(res, 401, "vous n'etes pas administrateur")
    }
};