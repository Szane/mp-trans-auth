/**
 * Created by Szane on 17/8/16.
 */
const logger = require('../util/Logger').createLogger('AdminService');
const db = require('../db/db');
const resUtil = require('../util/ResponseUtil');
const tb_verify_history = require('../model/verify_history');

exports.getVerifyHistory = async(req, res, next)=> {
    try {
        let params = req.query;
        let query = ` select vh.*,au.name from verify_history vh left join admin_user au on vh.op_user = au.id where vh.id is not null `;
        let paramsArr = [];
        if (params.verifyId != null) {
            paramsArr.push(params.verifyId);
            query += ` and vh.verify_id = ? `;
        }
        if (params.verifyType != null && params.verifyType != ``) {
            paramsArr.push(params.verifyType);
            query += ` and vh.verify_type = ? `;
        }
        if (params.startDate != null) {
            paramsArr.push(params.startDate + " 00:00:00");
            query += ` and vh.created_on >= ? `;
        }
        if (params.endDate != null) {
            paramsArr[i++] = params.endDate + " 23:59:59";
            query += ` and vh.created_on <= ? `;
        }
        query += " order by vh.created_on desc ";
        if (params.start != null && params.size != null) {
            paramsArr[i++] = parseInt(params.start);
            paramsArr[i++] = parseInt(params.size);
            query += ` limit ? , ? `;
        }
        let result = await db.simpleSelect(query, paramsArr);
        return resUtil.sendQueryRes(res, result, next);
    } catch (e) {
        logger.error(e);
        return resUtil.sendInternalError(e, res, next);
    }
};
exports.addVerifyHistory = async(req, res, next)=> {
    try {
        let params = req.body;
        await tb_verify_history.create({
            verify_id: params.verifyId,
            verify_type: params.verifyType,
            remark: params.remark,
            verify_status: params.verifyStatus,
            op_user: params.opUser
        });
        return resUtil.sendSuccessRes(res, next);
    } catch (error) {
        logger.error(error);
        return resUtil.sendInternalError(error, res, next);
    }
};