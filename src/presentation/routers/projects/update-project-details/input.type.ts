import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";

type inputType = JSONSchemaType<{
    params: { 
        id: string;
    };
    body: {
        title: string;
        status: string;
        description: string;
        dueDate: string;
        startDate: string;
        endDate: string;
    };
}> & {
    properties: {
        params: TransformableSchemaInterface;
        body: TransformableSchemaInterface;
    };
};

export default inputType;
