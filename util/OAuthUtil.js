/**
 * Created by Szane on 17/7/22.
 */
const serializer = require('serializer');
const headerTokenMeta = "auth-token";
const logger = require('../util/Logger').createLogger('OAuthUtil');
const redisDAO = require('../dao/RedisDAO');
const listOfValue = require('../util/ListOfValues');
const resUtil = require('../util/ResponseUtil');
const msg = require('../util/SystemMsg');
const oc3_token_opt = {
    head: "OC3_U_",
    web_expire: 7 * 24 * 60 * 60,
    app_expire: 7 * 24 * 60 * 60
};
let reqTokenObj = {
    headers: {
        'auth-token': null
    }
};
const SYSTEM_MODULES = {
    'mp_trans_sso': 'login',
    'mp_trans_mq': 'message-queue',
    'mp_trans_image': 'mimetype',
    'mp_trans_core': 'order',
    'mp_trans_loc': 'location',
    'mp_trans_batch': 'common-batch',
    'mp_trans_sti': 'sti'
};


const BROWSER_IE = 1;
const BROWSER_CHROME = 2;
const BROWSER_FIREFOX = 3;
const BROWSER_SAFARI = 4;
const BROWSER_OTHER = 5;
const APP_ANDROID = 6;
const APP_IOS = 7;
const DEVICE_UNKNOWN = 8;

let createAccessToken = async(userId, userType, subType, userStatus, device)=> {
    return serializer.stringify([userId, userType, subType, userStatus, device, parseInt(new Date().getTime() / 1000)])
};
/**
 * 获取访问设备/浏览器类型
 * @param request
 * @returns {number}
 */
let getRequestDevice = async(request)=> {
    let userAgent = request.headers['user-agent'] || request.headers['User-Agent'];
    if (userAgent == null)
        return DEVICE_UNKNOWN;
    else
        userAgent = userAgent.toLowerCase();
    if (userAgent.startsWith('mozilla')) {
        if (userAgent.indexOf('windows') >= 0)
            return BROWSER_IE;
        else if (userAgent.indexOf('safari') >= 0) {
            if (userAgent.indexOf('chrome') >= 0)
                return BROWSER_CHROME;
            else
                return BROWSER_SAFARI;
        } else if (userAgent.indexOf('firefox') >= 0)
            return BROWSER_FIREFOX;
        else
            return BROWSER_OTHER;
    } else if (userAgent == 'xml_android')
        return APP_ANDROID;
    else
        return DEVICE_UNKNOWN;
};
let saveAccessToken = async(user, deviceType)=> {
    let userStr = JSON.stringify({
        id: user.id,
        type: user.type,
        subType: user.subType,
        status: user.status,
        device: deviceType
    });
    let tokenKey = oc3_token_opt.head + user.accessToken;
    let expired = deviceType == 6 ? oc3_token_opt.app_expire : oc3_token_opt.web_expire;
    return redisDAO.setAsyStringVal({
        key: tokenKey,
        value: userStr,
        expired: expired
    });
};
let parseAccessToken = async(accessToken)=> {
    try {
        let data = serializer.parse(accessToken);
        return {
            userId: data[0],
            userType: data[1],
            subType: data[2],
            userStatus: data[3],
            device: data[4],
            createTime: data[5]
        }
    } catch (e) {
        logger.error(e);
        return null;
    }
};
let getSysModuleToken = async(module, devType)=> {
    if (module.mch in SYSTEM_MODULES) {
        let newAccessToken = createAccessToken(module.mch, listOfValue.USER_TYPE_MCH, listOfValue.USER_TYPE_MCH, 1, devType);//subType = 9
        saveAccessToken({
            id: module.mch,
            type: listOfValue.USER_TYPE_MCH,
            subType: listOfValue.USER_TYPE_MCH,
            status: 1,
            accessToken: newAccessToken
        }, devType);
        logger.info('getSysModuleToken' + desc);
        return newAccessToken;
    } else return null;
};
/**
 * 校验所有的请求token
 * @param req
 * @param res
 * @param next
 */
let checkReqToken = async(req, res, next)=> {
    try {
        let reqToken = req.headers[headerTokenMeta];
        if (!reqToken)
            return resUtil.sendFailedRes(res, msg.ERROR_LOGIN_EXPIRED, next);
        reqToken = oc3_token_opt.head + reqToken;
        let redisStr = await redisDAO.getStringVal({key: reqToken});
        if (!redisStr)
            return resUtil.sendFailedRes(res, msg.ERROR_LOGIN_EXPIRED, next);
        let authUser = JSON.parse(redisStr);
        if (!authUser)
            return resUtil.sendFailedRes(res, msg.ERROR_LOGIN_EXPIRED, next);
        //TODO authUser存在，控制非授权调用；authUser.type/subType 控制授权调用
        let deviceType = getRequestDevice(req);
        if (deviceType === 6)
            redisDAO.expireStringVal({key: token, expired: oc3_token_opt.app_expire});
        else redisDAO.expireStringVal({key: token, expired: oc3_token_opt.app_expire});
        return resUtil.sendSuccessRes(res, next);
    } catch (e) {
        logger.error(e);
        return resUtil.resInternalError(e, res, next);
    }
};
exports.getReqWithToken = ()=> {
    logger.debug(' getReqWithToken ' + reqTokenObj);
    logger.debug(' refresh token:last create time has passed for '
        + ( new Date().getTime() - reqTokenObj.headers.createTime) / 1000);
    var gapTime = 2 * 60 * 60 * 1000;
    if (reqTokenObj.headers['user-agent'] == 'xml_android') {
        logger.debug(' getToken for android ');
        gapTime = 30 * 24 * 60 * 60 * 1000;
    }
    if (reqTokenObj.headers[headerTokenMeta] == null
        || reqTokenObj.headers[headerTokenMeta] == undefined) {
        //create token
        createModuleToken(function (error, result) {
            if (error) {
                logger.error('getReqWithToken ' + error.message);
            } else {
                if (result.result)
                    reqTokenObj.headers[headerTokenMeta] = result.result.accessToken;
                reqTokenObj.headers.createTime = new Date().getTime();
            }
            logger.debug(reqTokenObj);
            callback(error, reqTokenObj);
        });
    } else if ((reqTokenObj.headers.createTime + gapTime) <= new Date().getTime()) {
        refreshModuleToken(function (error, result) {
            logger.debug(error || result);
            if (error) {
                logger.error('getReqWithToken ' + error.message);
            } else {
                reqTokenObj.headers[headerTokenMeta] = result.accessToken;
                reqTokenObj.headers.createTime = new Date().getTime();
            }
            callback(error, reqTokenObj);
        })
    } else {
        callback(null, reqTokenObj);
    }
};
exports.parseAccessToken = parseAccessToken;
exports.createAccessToken = createAccessToken;
exports.getRequestDevice = getRequestDevice;
exports.saveAccessToken = saveAccessToken;
exports.checkReqToken = checkReqToken;