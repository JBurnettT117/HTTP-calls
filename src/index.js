"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
var http_client_1 = require("./http-client");
Object.defineProperty(exports, "httpClient", { enumerable: true, get: function () { return http_client_1.httpClient; } });
// make dummy function that uses logger util and one that uses error and one that uses info;
// tsc index.ts //above functions go here
var logger_1 = require("./logger");
function logErrorResponse(error) {
    logger_1.logger.error(function () { return "Error Response: ".concat(error); });
}
function logInfoResponse(info) {
    logger_1.logger.constructor(function () { return "Error Response: ".concat(info); });
}
var errorMessage = "we ran out of jelly donuts!";
var infoMessage = "Our Jelly donuts are selling like hot cakes!";
logErrorResponse(errorMessage);
logInfoResponse(infoMessage);
