/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('biz_info', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    operator: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    jur_per: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    cdh_code: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    inner_flag: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    ip_info: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    ship_biz_code: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    part_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    }
});