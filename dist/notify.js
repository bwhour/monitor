"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
const axios_1 = __importDefault(require("axios"));
const routerServer = "https://hooks.slack.com/services/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";
const router = "https://hooks.slack.com/services/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";
const notify = async (chainId, token, data) => {
    let param = " chainid : " + chainId + "  address :" + token + " , balance : " + data;
    let output;
    try {
        const res = await axios_1.default.post(`${router}`, {
            "text": param
        });
        output = res.data;
    }
    catch (error) {
        console.error(error);
        output = error;
    }
    return output;
};
exports.notify = notify;
//# sourceMappingURL=notify.js.map