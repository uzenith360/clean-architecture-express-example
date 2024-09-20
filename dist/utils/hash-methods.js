"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class HashMethods {
    static compareHash(hash, password) {
        return bcrypt_1.default.compare(password, hash);
    }
    static hash(password, saltRounds) {
        return bcrypt_1.default.hash(password, saltRounds);
    }
}
exports.default = HashMethods;
