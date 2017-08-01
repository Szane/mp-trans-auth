/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('organiz', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    part_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    part_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    level: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    }
});