import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";

type inputType = JSONSchemaType<{
    params: { id: string; },
    body: {
        firstName: string;
        lastName: string;
        email: string;
        department: string;
        designation: string;
    };
}> & {
    properties: {
        body: TransformableSchemaInterface;
        params: TransformableSchemaInterface;
    };
};

export default inputType;
