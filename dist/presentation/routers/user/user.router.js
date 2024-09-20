"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UsersRouter;
const express_1 = __importDefault(require("express"));
const http_methods_enum_1 = __importDefault(require("../../../utils/http-methods.enum"));
const handler_1 = __importDefault(require("./get-all-users/handler"));
const handler_2 = __importDefault(require("./create-user/handler"));
const handler_3 = __importDefault(require("./delete-user/handler"));
const handler_4 = __importDefault(require("./get-user/handler"));
const handler_5 = __importDefault(require("./update-user-password/handler"));
const handler_6 = __importDefault(require("./update-user-profile/handler"));
function UsersRouter(getAllUsersUsecase, createUserUsecase, deleteUserUsecase, getUserUsecase, updateUserPasswordUsecase, updateUserProfileUsecase) {
    const router = express_1.default.Router();
    (0, handler_1.default)('/', http_methods_enum_1.default.GET, getAllUsersUsecase, router);
    (0, handler_2.default)('/', http_methods_enum_1.default.POST, createUserUsecase, router);
    (0, handler_3.default)('/:id', http_methods_enum_1.default.DELETE, deleteUserUsecase, router);
    (0, handler_4.default)('/:id', http_methods_enum_1.default.GET, getUserUsecase, router);
    (0, handler_5.default)('/:id/password', http_methods_enum_1.default.PATCH, updateUserPasswordUsecase, router);
    (0, handler_6.default)('/:id/profile', http_methods_enum_1.default.PATCH, updateUserProfileUsecase, router);
    return router;
}
