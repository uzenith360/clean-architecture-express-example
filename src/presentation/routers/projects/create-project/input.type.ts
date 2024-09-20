import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";

type inputType = JSONSchemaType<{
    body: {
        title: string;
        status: string;
        description: string;
        dueDate: string;
        startDate: string;
        endDate: string;
        assigneeIds: string[];
        tasks: string[];
    }
}> & {
    properties: {
        body: TransformableSchemaInterface;
    };
};

export default inputType;
