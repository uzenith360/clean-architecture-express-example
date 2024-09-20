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
                status: { type: "string", enum: Object.keys(projectStatus) },
            },
            required: ["status"],
            additionalProperties: false,
        }
    },
    required: ["params", "body"]
} as inputType;
