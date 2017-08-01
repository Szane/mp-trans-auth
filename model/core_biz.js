/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('core_biz', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    port_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    port_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    state_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    state_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    city_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    city_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    biz_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    biz_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    grade: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: true
    },
    lock_value: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: true
    },
    priority: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    bonus_point: {
        type: Sequelize.BIGINT(11),
        defaultValue: 0,
        allowNull: true
    },
    order_interval: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
});