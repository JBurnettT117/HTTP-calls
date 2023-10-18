import * as winston from "winston";
import {
    createLogger,
    format,
    transports
} from "winston";
import { LogLevels, TransformableInfo } from "./interfaces/logger-interface";

//package winston
//exported from this file and from index.js like how httpclient is
//export as a class

export class LogUtil {
    private static privateLoggerInstance:LogUtil;
    private readonly winstonLogger:winston.Logger;
    private readonly logLevel: LogLevels = 'info';
    constructor() {
        const formatter = (info:TransformableInfo):string => `${info.level.toUpperCase()}\t ${info.message}`
        this.winstonLogger = createLogger({
            format: format.combine(format.timestamp(), format.printf(formatter)),
            transports: [ new transports.Console() ]
        })
        this.setLogLevel(this.logLevel);
    }
    public static get instance():LogUtil{
        if(!this.privateLoggerInstance){
            this.privateLoggerInstance = new LogUtil();
        }
        return this.privateLoggerInstance
    }
    public static set instance(logUtil:LogUtil){
        this.privateLoggerInstance = logUtil;
    }
    public addFileLogger(filename:string, level:LogLevels):void{
        this.winstonLogger.add(new transports.File({filename, level}))
    }
    public error(factory:() => string):void {
        if(this.winstonLogger.isErrorEnabled()){
            this.winstonLogger.error(factory)
        }
    } 
    public info(factory:() => string):void {
        if(this.winstonLogger.isInfoEnabled()){
            this.winstonLogger.info(factory)
        }
    }
    public setLogLevel(level:string):void{
        this.winstonLogger.level = level.toLowerCase();
    }
};

const logger = LogUtil.instance;

export {logger};

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