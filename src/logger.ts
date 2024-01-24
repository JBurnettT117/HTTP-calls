import * as winston from "winston";
import {
    createLogger,
    format,
    transports
} from "winston";
import { LogLevels, TransformableInfo } from "./interfaces/logger-interface";

//add jsdocs for logutil. then done.

/**
 * Logger utility class using Winston for logging.
 *
 * @class LogUtil
 */
export class LogUtil {
    /**
     * Private instance of the LogUtil class.
     * @private
     * @static
     * @type {LogUtil}
     */
    private static privateLoggerInstance: LogUtil;
  
    /**
     * Winston logger instance.
     * @type {winston.Logger}
     * @readonly
     */
    private readonly winstonLogger: winston.Logger;
  
    /**
     * Log level for the logger.
     * @type {LogLevels}
     * @readonly
     */
    private readonly logLevel: LogLevels = 'info';
  
    /**
     * Creates an instance of LogUtil.
     * @constructor
     */
    constructor() {
      /**
       * Formatter function for Winston logger.
       *
       * @param {TransformableInfo} info - Log information.
       * @returns {string} Formatted log message.
       */
      const formatter = (info: TransformableInfo): string =>
        `${info.level.toUpperCase()}\t ${info.message}`;
  
      // Initialize Winston logger
      this.winstonLogger = createLogger({
        format: format.combine(format.timestamp(), format.printf(formatter)),
        transports: [new transports.Console()],
      });
  
      // Set log level
      this.setLogLevel(this.logLevel);
    }
  
    /**
     * Gets the instance of LogUtil (Singleton pattern).
     * @static
     * @type {LogUtil}
     * @memberof LogUtil
     */
    public static get instance(): LogUtil {
      if (!this.privateLoggerInstance) {
        this.privateLoggerInstance = new LogUtil();
      }
      return this.privateLoggerInstance;
    }
  
    /**
     * Sets the instance of LogUtil (Singleton pattern).
     * @static
     * @type {LogUtil}
     * @memberof LogUtil
     */
    public static set instance(logUtil: LogUtil) {
      this.privateLoggerInstance = logUtil;
    }
  
    /**
     * Adds a file logger to the Winston logger.
     *
     * @param {string} filename - Name of the log file.
     * @param {LogLevels} level - Log level for the file logger.
     * @memberof LogUtil
     */
    public addFileLogger(filename: string, level: LogLevels): void {
      this.winstonLogger.add(new transports.File({ filename, level }));
    }
  
    /**
     * Logs an error message using the error level.
     *
     * @param {() => string} factory - Function returning the error message.
     * @memberof LogUtil
     */
    public error(factory: () => string): void {
      if (this.winstonLogger.isErrorEnabled()) {
        this.winstonLogger.error(factory);
      }
    }
  
    /**
     * Logs an info message using the info level.
     *
     * @param {() => string} factory - Function returning the info message.
     * @memberof LogUtil
     */
    public info(factory: () => string): void {
      if (this.winstonLogger.isInfoEnabled()) {
        this.winstonLogger.info(factory);
      }
    }
  
    /**
     * Sets the log level for the logger.
     *
     * @param {string} level - Log level to be set.
     * @memberof LogUtil
     */
    public setLogLevel(level: string): void {
      this.winstonLogger.level = level.toLowerCase();
    }
  }
  

const logger = LogUtil.instance;

export {logger};

