/**
 * Created by Szane on 17/7/22.
 */
let restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
let resUtil = require('./util/ResponseUtil');
let userInfo = require('./service/UserInfoService');


let createServer = ()=> {
    var server = restify.createServer({
        name: 'mp',
        version: '1.0.0'
    });
    // Clean up sloppy paths like
    server.pre(restify.pre.sanitizePath());
    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());
    //server.use(roleBase.checkAuthToken);
    server.use(restify.plugins.throttle({
        burst: 1000,
        rate: 50,
        ip: true
    }));
    const cors = corsMiddleware({
        preflightMaxAge: 5, //Optional
        origins: ['*'],
        allowHeaders: [
            'auth-token',
            'client-id',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Credentials',
            'Access-Control-Allow-Methods', 'GET',
            'Access-Control-Allow-Methods', 'POST',
            'Access-Control-Allow-Methods', 'PUT',
            'Access-Control-Allow-Methods', 'DELETE',
            'Access-Control-Allow-Headers', 'accept,api-version, content-length, content-md5,x-requested-with,content-type, date, request-id, response-time'
        ]
    });
    server.pre(cors.preflight);
    server.use(cors.actual);
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.dateParser());
    server.use(restify.plugins.authorizationParser());
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.gzipResponse());
    server.use(restify.plugins.fullResponse());
    server.use(restify.plugins.bodyParser({uploadDir: __dirname + '/uploads/'}));
    server.get('/', function (req, res, next) {
        resUtil.resNoAuthorizedError(null, res, next);
    });

    server.get('/api/user', userInfo.getUserInfo);

    return (server);
};
module.exports = {
    createServer: createServer
};