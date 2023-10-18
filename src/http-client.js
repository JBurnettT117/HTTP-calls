"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
var axios_1 = require("axios");
var axiosInstance = axios_1.default.create({
    timeout: 20000,
    headers: { Accept: "application/json" }
});
exports.httpClient = axiosInstance;
