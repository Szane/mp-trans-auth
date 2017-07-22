/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('admin_user', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    admin_status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    admin_type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
});
