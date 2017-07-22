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
    }
});