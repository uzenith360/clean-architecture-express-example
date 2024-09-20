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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const hash_methods_1 = __importDefault(require("../../../utils/hash-methods"));
const { SALT_ROUNDS = 10 } = process_1.env;
class UpdateUserPasswordUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(id, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            //first compare oldpassword with whats in db
            const user = yield this.userRepository.getUser(id);
            if (!user || !(yield hash_methods_1.default.compareHash(user.hash, oldPassword))) {
                return false;
            }
            const result = yield this.userRepository.updateUser(id, { hash: yield hash_methods_1.default.hash(newPassword, +SALT_ROUNDS) });
            return result;
        });
    }
}
exports.default = UpdateUserPasswordUsecase;
