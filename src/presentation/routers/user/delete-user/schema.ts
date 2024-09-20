import inputType from "./input.type";

export default {
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
} as inputType;
