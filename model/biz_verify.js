/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('biz_verify', {
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
    biz_lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    biz_lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    org_lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    org_lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    tax_lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    tax_lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    bank_lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    bank_lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    bank_name: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    trans_lic_img: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    trans_lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    owner_lic_img1: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    owner_lic_img2: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    owner_lic_num: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status: {
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