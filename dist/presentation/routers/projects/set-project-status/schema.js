"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_status_enum_1 = __importDefault(require("../../../../domain/project-status.enum"));
exports.default = {
    type: "object",
    properties: {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    pattern: "^[0-9a-fA-F]{24}$",
                },
            },
            required: ["id"],
            additionalProperties: false,
        },
        body: {
            type: "object",
            properties: {
                status: { type: "string", enum: Object.keys(project_status_enum_1.default) },
            },
            required: ["status"],
            additionalProperties: false,
        }
    },
    required: ["params", "body"]
};
