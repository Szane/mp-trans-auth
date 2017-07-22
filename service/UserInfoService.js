/**
 * Created by Szane on 17/7/22.
 */
const logger = require('../util/Logger').createLogger('UserInfoService');
const db = require('../db/db');

const resUtil = require('../util/ResponseUtil');
const listOfValue = require('../util/ListOfValues');
const msg = require('../util/SystemMsg');
const redisDAO = require('../dao/RedisDAO');
const encrypt = require('../util/Encrypt');

//models
const tb_user = require('../model/user_info');
const tb_biz = require('../model/biz_info');

/**
 * web前台用户注册
 * @param req
 * @param res
 * @param next
 */
exports.addUser = async(req, res, next)=> {
    try {
        let params = req.params;
        db.transaction(async function (t) {
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
                if (!params.code)
                    return resUtil.sendFailedRes(res, msg.CUST_SMS_CAPTCHA_ERROR);
                if (params.code != await redisDAO.getStringVal({key: key}))//code 必填
                    return resUtil.sendFailedRes(res, msg.CUST_SMS_CAPTCHA_ERROR);
            }
            user = await tb_user.create({
                username: params.phone,
                password: encrypt.encryptByMd5(params.password),
                status: listOfValue.USER_STATUS_ACTIVE,
                type: listOfValue.USER_TYPE_NOT_VERIFIED,
                subType: listOfValue.USER_SUB_TYPE_NOT_VERIFIED,
                phone: params.phone,
                remark: params.remark
            }, {transaction: t});
            let biz = await tb_biz.create({
                userId: user.id,
                type: params.type,
                name: params.name,
                shipBizCode: params.shipBizCode
            }, {transaction: t});

        });
    } catch (error) {
        logger.error(error);
        return resUtil.resInternalError(error, res, next);
    }
};
exports.getUserInfo = async(req, res, next)=> {
    logger.debug(tb_user);
    let theUser = await tb_user.findAll({});
    logger.debug(theUser);
    return resUtil.sendQueryRes(res, theUser, next);
};