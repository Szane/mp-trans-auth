/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('bonus_point_history', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    order_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    action_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    action_name: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    point: {
        type: Sequelize.BIGINT(10),
        defaultValue: 0,
        allowNull: true
    },
    remain_point: {
        type: Sequelize.BIGINT(10),
        defaultValue: 0,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
});