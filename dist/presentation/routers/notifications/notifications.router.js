"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationsRouter;
const express_1 = __importDefault(require("express"));
const http_methods_enum_1 = __importDefault(require("../../../utils/http-methods.enum"));
const handler_1 = __importDefault(require("./get-all-notifications/handler"));
function NotificationsRouter(getAllNotificationsUsecase) {
    const router = express_1.default.Router();
    (0, handler_1.default)('/', http_methods_enum_1.default.GET, getAllNotificationsUsecase, router);
    return router;
}
