/**
 * Created by Szane on 17/7/22.
 */
let restify = require('restify');
const sequelize = require('./db/db').sequelize;
let auth_server = require('./server');
const logger = require('./util/Logger').createLogger('UserInfoService');
(()=> {
    let server = auth_server.createServer();
    server.listen(8091, function () {
        logger.info(`start listening at %s`, server.url);
    });
})();