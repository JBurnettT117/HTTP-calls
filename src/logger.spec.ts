const mockLogger = {
    isInfoEnabled: jest.fn(),
    isErrorEnabled: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    level: jest.fn()
}



const templateFunction: any[] = [];

const mockWinston = {//this is a mock of winstons functionality required for testing.
    createLogger: jest.fn().mockReturnValue(mockLogger),
    format: {
        colorized: jest.fn(),
        combine: jest.fn().mockReturnValue('combined format'),
        label: jest.fn(),
        timestamp: jest.fn(),
        printf: jest.fn().mockImplementation((templateFn: () => string) => {
            templateFunction.push(templateFn)
        })
    },
    transports: {
        Console: jest.fn().mockReturnValue({type: 'console transport'}),
        File: jest.fn().mockReturnValue({type: 'file transport'})
    }
};

jest.mock('winston', () => mockWinston)

import { TransformableInfo } from "./interfaces/logger-interface";
import {LogUtil, logger} from "./logger";
import spyOn from '@jest/globals'

describe('logger', () => {
    let testSubject:LogUtil;
    let logLevelSpy:any = {}
    let errorSpy:any = {}
    let infoSpy:any = {}
    beforeEach(() => {
        testSubject = LogUtil.instance;
        logLevelSpy = jest.spyOn(testSubject, 'setLogLevel');
        errorSpy = jest.spyOn(testSubject, 'error');
        infoSpy = jest.spyOn(testSubject, 'info');
    })
    describe('instance',() => {
        it('returns a new logUtil instance and validates initial log level as info', () => {
            expect(testSubject).toBeInstanceOf(LogUtil)
            expect((testSubject as any).logLevel).toEqual('info')
        })
        it('formats our message as info.level info.message', () => {
            const infoMessage:TransformableInfo = {
                level: 'info',
                message: 'Hello World!'
            };
            (LogUtil as any).instance = undefined;
            expect(templateFunction[0](infoMessage)).toBe(`${infoMessage.level.toUpperCase()}\t ${infoMessage.message}`)
        })
    })
    describe('setLogLevel', () => {
        it('checks to see if the setLogLevel function has been called', () => {
            testSubject.setLogLevel('error')
            expect(logLevelSpy).toHaveBeenCalledTimes(1);
            expect(logLevelSpy).toHaveBeenCalledWith('error');
        })
    })
    describe('error', () => {
        it('checks to see if the error function has been called', () => {
            testSubject.error(() => {
                return 'this is an error message'
            });
            expect(errorSpy).toHaveBeenCalledTimes(1);
            expect(errorSpy).toHaveBeenCalledWith(() => 'this is an error message')
        })
    })
    describe('info', () => {
        it('checks to see if the info function has been called', () => {
            testSubject.info(() => {
                return 'this is an info message'
            });
            expect(infoSpy).toHaveBeenCalledTimes(1);
            expect(infoSpy).toHaveBeenCalledWith('this is an info message')
        })
    })
})

//homework
//do a describe for setLogLevel

//utilize mock for this, look into jest.spyOn
//no new functionality
//do a describe for logger.error
//do a describe for logger.info