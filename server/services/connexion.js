import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const onConnexion = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, 
    {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);
const initializeConnexion = () => {
    try {
        onConnexion.authenticate();
        console.log(`Connection à la base de données :: ${process.env.DB_NAME} a réussie !`)
    } catch (error) {
        console.log(`Une erreur vient de se produire lors de la connection à la base de données :: ${process.env.DB_NAME}`)
        console.error(error.message)
    }
};
initializeConnexion();
export default onConnexion;
