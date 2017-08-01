/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('user_department', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    biz_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    department_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
});