/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('core_biz_config', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    param_name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    params_value: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(20),
        allowNull: true
    }
});