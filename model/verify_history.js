/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('verify_history', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    verify_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    verify_type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    verify_status: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    op_user: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    }
});