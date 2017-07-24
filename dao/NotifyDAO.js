/**
 * Created by Szane on 17/7/22.
 */
const common = require('../util/CommonUtil');
const config = require('../config/SystemConfig');
const logger = require('../util/Logger').createLogger('UserInfoService');

exports.sendNotification = async(params)=> {
    let result = await common.httpPost(config.NotificationServer, '/api/notification', {}, params);
    logger.info(result);
    return result;
};