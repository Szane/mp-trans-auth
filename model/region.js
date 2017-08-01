/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('region', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    pid: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    adcode: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    p_name: {
        type: Sequelize.STRING(40),
        allowNull: true
    }
});
