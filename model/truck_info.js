/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('truck_info', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    biz_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    owner_name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    owner_phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    owner_id_num: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    owner_gender: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    truck_num: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    truck_lic_num: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    trailer_num: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    trailer_lic_num: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    lic_zipcode: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    trailer_lic_zipcode: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    truck_lic_img: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    trailer_lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    truck_lic_expired: {
        type: Sequelize.DATE,
        allowNull: true
    },
    trailer_lic_expired: {
        type: Sequelize.DATE,
        allowNull: true
    },
    insurance1_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    insurance2_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    insurance3_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    e6_flag: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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