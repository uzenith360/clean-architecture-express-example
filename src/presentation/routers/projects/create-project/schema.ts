import projectStatus from "../../../../domain/project-status.enum";
import inputType from "./input.type";

export default {
    type: "object",
    properties: {
        body: {
            type: "object",
            properties: {
                title: { type: "string", transform: ["trim", "toLowerCase"] },
                status: { type: "string", enum: Object.keys(projectStatus) },
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
} as inputType;
