import projectStatus from "../../../../domain/project-status.enum";
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
            },
            required: ["id"],
            additionalProperties: false,
        },
        body: {
            type: "object",
            properties: {
                assigneeId: { type: "string", pattern: "^[0-9a-fA-F]{24}$", },
            },
            required: ["assigneeId"],
            additionalProperties: false,
        }
    },
    required: ["params", "body"]
} as inputType;
