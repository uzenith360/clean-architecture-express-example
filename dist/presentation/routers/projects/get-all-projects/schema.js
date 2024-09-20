"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "object",
    properties: {
        query: {
            type: "object",
            properties: {
                page: { type: "integer", minimum: 1 },
                limit: { type: "integer", maximum: 200 }
            },
            required: ["page", "limit"],
            additionalProperties: false,
        }
    },
    required: ["query"]
};
