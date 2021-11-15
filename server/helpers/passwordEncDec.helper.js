import bcrypt from 'bcrypt';
import Randomstring from 'randomstring';

const encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(password,salt);
     return hashedPassword
};
const isPasswordTrue = async (currPassword, hashedPassword)=>{
    const isPasswordChecked = await bcrypt.compare(currPassword, hashedPassword);
    return isPasswordChecked;
};
function comparePassword(password, hashed){
    const matched = bcrypt.compareSync(password, hashed);
    return matched
};
const id_ = (f,l) =>{
    const _ = f.substring(0,1).toString().toUpperCase();
    const __ = l.substring(0,1).toString().toUpperCase();
    const ll = new Date().getMilliseconds() * 10;
    return `-AG-${ll}${_}${__}`;
};
const idClient = (f,l) =>{
    const _ = f.substring(0,1).toString().toUpperCase();
    const __ = l.substring(0,1).toString().toUpperCase();
    const ll = new Date().getMilliseconds() * 10;
    return `${ll}${_}${__}`;
};
const randomLine = () => {
    const _ = new Date().getMilliseconds()
    return new String(`${_}@`).concat(Randomstring.generate(13));
};
const randomstring = () => {
    const _ = new Date().getMilliseconds()
    return new String(`IMG_${_}_`).concat(Randomstring.generate(13));
};
export default {
    encryptPassword: encryptPassword,
    isPasswordTrue: isPasswordTrue,
    randomstring: randomstring,
    randomid: id_,
    randomLine,
    randomidclient: idClient
}