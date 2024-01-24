export {httpClient} from "./http-client";

import {logger} from "./logger";

function logErrorResponse(error: string){
    logger.error(() => `Error Response: ${error}`)
}

function logInfoResponse(info: string){
    logger.constructor(() => `Error Response: ${info}`)
}

const errorMessage = "we ran out of jelly donuts!"
const infoMessage = "Our Jelly donuts are selling like hot cakes!";

logErrorResponse(errorMessage);
logInfoResponse(infoMessage);