import Sequelize from 'sequelize';
import db from '../services/connexion.js';
const User = db.define('__tbl_users', {
  
    datastatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fsname: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },  
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

}, {
    timestamps: false,
    freezeTableName: true
});

export default User;