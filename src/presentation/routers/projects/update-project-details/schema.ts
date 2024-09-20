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
                title: { type: "string", transform: ["trim", "toLowerCase"] },
                status: { type: "string", enum: Object.keys(projectStatus) },
                startDate: { type: "string", },
                endDate: { type: "string", },
                dueDate: { type: "string" },
                description: { type: "string", transform: ["trim", "toLowerCase"] },
            },
            required: ["title", "status", "startDate", "endDate", "dueDate", "description"],
            additionalProperties: false,
        }
    },
    required: ["params", "body"]
} as inputType;
