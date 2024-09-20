"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "object",
    properties: {
        params: {
            type: "object",
            properties: {
                id: { type: "string" },
            },
            required: ["id"]
        },
    },
    required: ["params"]
};
