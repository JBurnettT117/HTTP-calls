"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogUtil = void 0;
var winston_1 = require("winston");
//package winston
//exported from this file and from index.js like how httpclient is
//export as a class
var LogUtil = /** @class */ (function () {
    function LogUtil() {
        this.logLevel = 'info';
        var formatter = function (info) { return "".concat(info.level.toUpperCase(), "\t ").concat(info.message); };
        this.winstonLogger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(formatter)),
            transports: [new winston_1.transports.Console()]
        });
        this.setLogLevel(this.logLevel);
    }
    Object.defineProperty(LogUtil, "instance", {
        get: function () {
            if (!this.privateLoggerInstance) {
                this.privateLoggerInstance = new LogUtil();
            }
            return this.privateLoggerInstance;
        },
        set: function (logUtil) {
            this.privateLoggerInstance = logUtil;
        },
        enumerable: false,
        configurable: true
    });
    LogUtil.prototype.addFileLogger = function (filename, level) {
        this.winstonLogger.add(new winston_1.transports.File({ filename: filename, level: level }));
    };
    LogUtil.prototype.error = function (factory) {
        if (this.winstonLogger.isErrorEnabled()) {
            this.winstonLogger.error(factory);
        }
    };
    LogUtil.prototype.info = function (factory) {
        if (this.winstonLogger.isInfoEnabled()) {
            this.winstonLogger.info(factory);
        }
    };
    LogUtil.prototype.setLogLevel = function (level) {
        this.winstonLogger.level = level.toLowerCase();
    };
    return LogUtil;
}());
exports.LogUtil = LogUtil;
;
var logger = LogUtil.instance;
exports.logger = logger;
//class has private and public functions
// public is function allowed to be used outside of class
// private is function only allowed to be used inside of the class / the file it was built in.
// testing a private class is also more difficult to get to.
// should always be private unless data outside the file needs to be passed in or if you need to use outside
//wouldnt want static if you werent making an instance based class
//default to static
//in classes getters and setters
//getter is (variable can also be private or public) for getting a private variables information -- private instance is private variable on log util. need to call public getter function for a private variable
//end goal
//create a formatter
//create winston logger
//set log level of logger -- log level indicates what gets passed out
//needs
//getter
//setter
//  Methods --controls what logs are available when
//  error -- has two methods
//  info -- has two methods
