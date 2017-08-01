/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('app_version', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    app_type: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    app_version_name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    update_type: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    app_url: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(600),
        allowNull: true
    },
    img_url: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true
    },
    download_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
});