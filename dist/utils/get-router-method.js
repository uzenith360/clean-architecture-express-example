"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_methods_enum_1 = __importDefault(require("./http-methods.enum"));
exports.default = (router, method) => {
    var _a;
    return ((_a = {
        [http_methods_enum_1.default.GET]: router.get,
        [http_methods_enum_1.default.PATCH]: router.patch,
        [http_methods_enum_1.default.POST]: router.post,
        [http_methods_enum_1.default.PUT]: router.put,
        [http_methods_enum_1.default.DELETE]: router.delete
    }[method]) !== null && _a !== void 0 ? _a : router.get).bind(router);
};
