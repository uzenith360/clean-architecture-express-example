import inputType from "./input.type";

export default {
    type: "object",
    properties: {
        body: {
            type: "object",
            properties: {
                firstName: { type: "string", transform: ["trim", "toLowerCase"] },
                lastName: { type: "string", transform: ["trim", "toLowerCase"] },
                email: { type: "string", transform: ["trim", "toLowerCase"] },
                department: { type: "string", transform: ["trim", "toLowerCase"] },
                designation: { type: "string", transform: ["trim", "toLowerCase"] },
                // setId: { type: "string" },
                // eventId: { type: "string" },
                // contactId: { type: "string" },
                // photoIds: { type: "array", items: { type: "string" }, minItems: 1, uniqueItems: true },
                // email: { type: "string", transform: ["trim", "toLowerCase"] },
                // downloadPIN: { type: "string", transform: ["trim", "toUpperCase"] },
            },
            required: [/*"setId", "eventId", "contactId", "photoIds"*/"firstName", "department", "designation", "email"]
        },
        // query: {
        //     type: "object",
        //     properties: {
        //         search: { type: "string", transform: ["trim", "toLowerCase"], minLength: 1 }
        //     },
        //     required: ["search"],
        //     additionalProperties: false
        // }
    },
    required: ["body"/*, "query"*/]
} as inputType;
