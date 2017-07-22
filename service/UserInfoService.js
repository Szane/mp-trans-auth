/**
 * Created by Szane on 17/7/22.
 */
const logger = require('../util/Logger').createLogger('UserInfoService');
const db = require('../db/db');
const tb_user = require('../model/user_info');
const resUtil = require('../util/ResponseUtil');
const listOfValue = require('../util/ListOfValues');
const msg = require('../util/SystemMsg');
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

            }


        });
    } catch (error) {
        logger.error(error);
        return resUtil.resInternalError(error, res, next);
    }


};
exports.getUserInfo = async(req, res, next)=> {
    let theUser = await tb_user.findAll({});
    logger.debug(theUser);
    return resUtil.sendQueryRes(res, theUser, next);
};