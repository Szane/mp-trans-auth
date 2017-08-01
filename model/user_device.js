/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('user_device', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    device_token: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    device_type: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    device_account: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    sound_type: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    }
});