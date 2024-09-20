import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";

type inputType = JSONSchemaType<{
    params: { 
        id: string;
    };
}> & {
    properties: {
        params: TransformableSchemaInterface;
    };
};

export default inputType;
