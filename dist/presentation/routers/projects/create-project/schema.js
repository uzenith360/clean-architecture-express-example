"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_status_enum_1 = __importDefault(require("../../../../domain/project-status.enum"));
exports.default = {
    type: "object",
    properties: {
        body: {
            type: "object",
            properties: {
                title: { type: "string", transform: ["trim", "toLowerCase"] },
                status: { type: "string", enum: Object.keys(project_status_enum_1.default) },
                startDate: { type: "string", },
                endDate: { type: "string", },
                dueDate: { type: "string" },
                description: { type: "string", transform: ["trim", "toLowerCase"] },
                assigneeIds: { type: "array", items: { type: "string", pattern: "^[0-9a-fA-F]{24}$" }, minItems: 1, uniqueItems: true },
                tasks: { type: "array", items: { type: "string", transform: ["trim", "toLowerCase"] }, minItems: 1, uniqueItems: true },
            },
            required: ["title", "assigneeIds", "tasks"]
        },
    },
    required: ["body"]
};
