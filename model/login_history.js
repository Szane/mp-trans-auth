/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('login_history', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
});