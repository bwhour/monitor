"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var web3_1 = require("web3");
var axios_1 = require("axios");
var secondTimeout = 1000;
var minTimeout = 60 * secondTimeout;
var hourTimeout = 60 * minTimeout;
var dayTimeout = 60 * hourTimeout;
var routerUrl = "https://hooks.slack.com/services/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";
var notice_address = [
    "0x9d166026c09edf25bf67770d52a2cb7ddd4008b4",
    "0x5e8948be84de1a74769207928da2443619daf7fe"
];
var noticeData = {};
var ethBalance, weiBalance = '';
var chainId = 0;
function notice(msgs) {
    return __awaiter(this, void 0, void 0, function () {
        var param, output, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    param = " chainid : " + chainId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].post("".concat(routerUrl), {
                            "text": param
                        })];
                case 2:
                    res = _a.sent();
                    output = res.data;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    output = error_1;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, output];
            }
        });
    });
}
function getBscTestInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var web3;
        var _this = this;
        return __generator(this, function (_a) {
            //??????web3??????
            chainId = 97;
            noticeData[chainId] = [];
            web3 = new web3_1["default"]('https://data-seed-prebsc-2-s2.binance.org:8545');
            notice_address.forEach(function (address) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, web3.eth.getBalance(address)];
                        case 1:
                            weiBalance = _a.sent();
                            ethBalance = web3.utils.fromWei(weiBalance);
                            console.log("chainId:" + chainId + ", addr : " + address + ", ethBalance : " + ethBalance);
                            noticeData[chainId].push({ addr: address, balance: ethBalance });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/, noticeData];
        });
    });
}
function getPolygonTestInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var web3;
        var _this = this;
        return __generator(this, function (_a) {
            //??????web3??????
            chainId = 80001;
            noticeData[chainId] = [];
            web3 = new web3_1["default"]("https://rpc-mumbai.matic.today");
            notice_address.forEach(function (address) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, web3.eth.getBalance(address)];
                        case 1:
                            weiBalance = _a.sent();
                            ethBalance = web3.utils.fromWei(weiBalance);
                            console.log("chainId:" + chainId + ", addr : " + address + ", ethBalance : " + ethBalance);
                            noticeData[chainId].push({ addr: address, balance: ethBalance });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/, noticeData];
        });
    });
}
function getText() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBscTestInfo()];
                case 1:
                    noticeData = _a.sent();
                    return [4 /*yield*/, getPolygonTestInfo()];
                case 2:
                    noticeData = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function Foo() {
    getText();
    //setTimeout(Foo, hourTimeout);
}
new Foo();
