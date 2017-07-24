/**
 * Created by Szane on 17/7/22.
 */
const http = require('http');
const logger = require('../util/Logger').createLogger('CommonUtil');

let httpRequest = (server, path, request, params, method)=> {
    return new Promise(function (resolve, reject) {
        let paramStr = JSON.stringify(params);
        let options = {
            host: server.host,
            port: server.port,
            path: path,
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(paramStr, 'utf8')
            }
        };
        if (request && request.headers && request.headers['auth-token'])
            options.headers['auth-token'] = request.headers['auth-token'];
        let req = http.request(options, (res)=> {
            var data = "";
            res.on('data', (d)=> {
                data += d;
            });
            res.on('end', ()=> {
                var resObj = eval("(" + data + ")");
                resolve(resObj);
            });
        });
        req.write(paramStr);
        req.on('error', (e)=> {
            logger.error(e);
            reject(e);
        });
        req.end();
    });
};
exports.httpPost = (server, path, req, params)=> {
    return httpRequest(server, path, req, params);
};
exports.httpPut = (server, path, req, params)=> {
    return httpRequest(server, path, req, params, 'PUT');
};
exports.httpGet = (server, path, req, params)=> {
    return httpRequest(server, path, req, params, 'GET');
};
exports.httpDelete = (server, path, req, params)=> {
    return httpRequest(server, path, req, params, 'DELETE');
};
