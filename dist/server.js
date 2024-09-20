"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.use(express_1.default.json()); // Middleware to parse JSON bodies
server.use(express_1.default.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
exports.default = server;
