/**
 * Created by Szane on 17/7/22.
 */
const logger = require('../util/Logger').createLogger('UserInfoService');
const db = require('../db/db');

const resUtil = require('../util/ResponseUtil');
const oAuthUtil = require('../util/OAuthUtil');
const listOfValue = require('../util/ListOfValues');
const msg = require('../util/SystemMsg');
const redisDAO = require('../dao/RedisDAO');
const encrypt = require('../util/Encrypt');
const notifyDAO = require('../dao/NotifyDAO');
const notifyTemplate = require('../util/NotifyTemplate');

//models
const tb_user = require('../model/user_info');
const tb_biz = require('../model/biz_info');
const tb_bonus_config = require('../model/bonus_config');
const tb_bonus_point = require('../model/bonus_point');
const tb_bonus_point_history = require('../model/bonus_point_history');

/**
 * web前台用户注册
 * @param req
 * @param res
 * @param next
 */
exports.addUser = async(req, res, next)=> {
    db.transaction(async function (t) {
        try {
            let params = req.body;
            let user = await tb_user.findOne({
                where: {
                    phone: params.phone,
                    status: listOfValue.USER_STATUS_ACTIVE
                }, transaction: t
            });
            if (user && params.type == listOfValue.USER_TYPE_SHIPPING)
                return resUtil.sendFailedRes(res, msg.ERROR_USER_NAME_ADDED, next);
            if (user)
                return resUtil.sendFailedRes(res, msg.CUST_SIGNUP_PHONE_REGISTERED, next);
            if (params.type != listOfValue.BIZ_TYPE_SHIPPING) {
                let key = listOfValue.CACHE_APPEND_REG + params.phone;
                // if (!params.code)
                //     return resUtil.sendFailedRes(res, msg.CUST_SMS_CAPTCHA_ERROR);
                // if (params.code != await redisDAO.getStringVal({key: key}))//code 必填
                //     return resUtil.sendFailedRes(res, msg.CUST_SMS_CAPTCHA_ERROR);
            }
            user = await tb_user.create({
                username: params.phone,
                password: await encrypt.encryptByMd5(params.password),
                status: listOfValue.USER_STATUS_ACTIVE,
                type: listOfValue.USER_TYPE_NOT_VERIFIED,
                sub_type: listOfValue.USER_SUB_TYPE_NOT_VERIFIED,
                phone: params.phone,
                remark: params.remark
            }, {transaction: t});
            let biz = await tb_biz.create({
                user_id: user.id,
                type: params.type,
                name: params.name,
                ship_biz_code: params.shipBizCode
            }, {transaction: t});
            //发送注册成功站内信
            let template;
            if (params.type == listOfValue.USER_TYPE_AGENCY)
                template = notifyTemplate.AGENT_REGISTER;
            else if (params.type == listOfValue.USER_TYPE_TRUCK_TEAM)
                template = notifyTemplate.TRUCK_REGISTER;
            else if (params.type == listOfValue.USER_TYPE_SHIPPING)
                template = notifyTemplate.SHIP_REGISTER;
            // await notifyDAO.sendNotification({
            //     title: template.title,
            //     body: template.content,
            //     status: listOfValue.NOTIFY_STATUS_READED_NO,
            //     receiver: user.id,
            //     receiver_biz: biz.id,
            //     receiver_name: '',
            //     receiver_type: params.type
            // });
            //注册时初始化用户积分
            if (params.type == listOfValue.USER_TYPE_AGENCY ||
                params.type == listOfValue.USER_TYPE_DRIVER) {
                let bonusConfig = await tb_bonus_config.findOne({
                    where: {id: listOfValue.BONUS_TYPE_AGENT_SIGN_UP}, transaction: t
                });
                if (!bonusConfig) {
                    t.rollback();
                    return resUtil.sendFailedRes(res, msg.ERROR_LACK_OF_CONFIG, next);
                }
                let bonusPoint = await tb_bonus_point.create({
                    user_id: user.id,
                    biz_id: biz.id,
                    phone: params.phone,
                    user_type: params.type,
                    total_point: bonusConfig.point
                }, {transaction: t});
                await tb_bonus_point_history.create({
                    bonus_id: bonusPoint.id,
                    user_id: user.id,
                    action_id: listOfValue.BONUS_TYPE_AGENT_SIGN_UP,
                    action_name: bonusConfig.action_name,
                    type: bonusConfig.type,
                    point: bonusConfig.point,
                    remain_point: bonusConfig.point
                }, {transaction: t});
            }
            user = JSON.parse(JSON.stringify(user));
            user.userId = user.id;
            user.bizId = biz.id;
            let deviceType = oAuthUtil.getRequestDevice(req.headers['User-Agent'] || req.headers['user-agent']);
            user.accessToken = oAuthUtil.createAccessToken(user.id, listOfValue.USER_TYPE_NOT_VERIFIED, listOfValue.USER_SUB_TYPE_NOT_VERIFIED,
                listOfValue.USER_STATUS_ACTIVE, deviceType);
            user.type = listOfValue.USER_TYPE_NOT_VERIFIED;
            user.subType = listOfValue.USER_SUB_TYPE_NOT_VERIFIED;
            user.status = listOfValue.USER_STATUS_ACTIVE;
            oAuthUtil.saveAccessToken(user, deviceType);
            return resUtil.sendQueryRes(res, user, next);
        } catch (error) {
            logger.error(error);
            t.rollback();
            return resUtil.resInternalError(error, res, next);
        }
    });
};
exports.getUserInfo = async(req, res, next)=> {
    logger.debug(tb_user);
    let theUser = await tb_user.findAll({});
    logger.debug(theUser);
    return resUtil.sendQueryRes(res, theUser, next);
};