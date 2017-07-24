/**
 * Created by Szane on 17/7/22.
 */
const config = {
    mysqlConfig: {
        dialect: 'mysql',
        database: 'sinotrans_user',
        username: 'root',
        password: 'bizwise',
        host: '123.57.11.150',
        port: 3306
    },
    redisConfig: {
        url: "redis://60.205.227.44:6379/"
    },
    mongoConfig: {},
    loggerConfig: {
        level: 'DEBUG',
        config: {
            appenders: [
                {type: 'console'},
                {
                    "type": "file",
                    "filename": "../common-login.log",
                    "maxLogSize": 2048000,
                    "backups": 10
                }
            ]
        }
    },
    MessageQueueServer: {
        host: "60.205.227.44",
        port: 8092
    },
    NotificationServer: {
        host: "60.205.227.44",
        port: 8096
    },
    cmsServer: {
        host: '60.205.227.44',
        port: 8097
    }
};
module.exports = config;
