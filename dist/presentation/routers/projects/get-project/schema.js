"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        }
    },
    required: ["params"]
};
