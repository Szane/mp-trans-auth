/**
 * Created by Szane on 17/7/22.
 */
const db = require('../db/db');
const sequelize = db.sequelize;
const Sequelize = require('sequelize');

module.exports = sequelize.define('user_info', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    avatar: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    address: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    state: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    city: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    department_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    wechat_id: {
        type: Sequelize.STRING(60),
        allowNull: true
    },
    wechat_status: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sub_type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    p_biz_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true
    },
    last_login_on: {
        type: Sequelize.DATE,
        allowNull: true
    },
    remark: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
});
