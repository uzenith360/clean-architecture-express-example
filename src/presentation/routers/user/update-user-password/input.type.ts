import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";

type inputType = JSONSchemaType<{
    params: { 
        id: string;
    };
    body: {
        oldPassword: string;
        newPassword: string;
    };
}> & {
    properties: {
        params: TransformableSchemaInterface;
        body: TransformableSchemaInterface;
    };
};

export default inputType;
