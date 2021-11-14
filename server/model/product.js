import Sequelize from 'sequelize';
import db from '../services/connexion.js';
const Product = db.define('__tbl_products', {
  
    datastatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    alt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categorie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    button: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"Details"
    },  
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },

}, {
    timestamps: false,
    freezeTableName: true
});

export default Product;