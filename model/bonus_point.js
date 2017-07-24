/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('bonus_point', {
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
        allowNull: true
    },
    biz_name: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    user_type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    total_point: {
        type: Sequelize.BIGINT(10),
        defaultValue: 0,
        allowNull: true
    },
    first_flag: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
});