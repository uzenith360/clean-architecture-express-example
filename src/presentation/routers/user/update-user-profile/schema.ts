import inputType from "./input.type";

export default {
    type: "object",
    properties: {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    pattern: "^[0-9a-fA-F]{24}$",
                },
                oldPassword: {
                    type: "string",
                },
                newPassword: {
                    type: "string",
                },
            },
            required: ["id", "oldPassword", "newPassword"],
            additionalProperties: false,
        },
        body: {
            type: "object",
            properties: {
                firstName: { type: "string", transform: ["trim", "toLowerCase"] },
                lastName: { type: "string", transform: ["trim", "toLowerCase"] },
                email: { type: "string", transform: ["trim", "toLowerCase"] },
                department: { type: "string", transform: ["trim", "toLowerCase"] },
                designation: { type: "string", transform: ["trim", "toLowerCase"] },
            },
            required: ["firstName", "department", "designation", "email"],
            additionalProperties: false,
        }
    },
    required: ["params", "body"]
} as inputType;
