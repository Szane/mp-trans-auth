/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('bonus_config', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    bonus_name: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    action_name: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    user_type: {
        type: Sequelize.INTEGER,
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