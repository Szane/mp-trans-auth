/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('driver_verify', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    biz_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    truck_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    res_zipcode: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    res_address: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    lic_zipcode: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    lic_type: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    lic_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    id_img1: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    id_img2: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    id_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    op_user: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    }
});