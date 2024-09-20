import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";

type inputType = JSONSchemaType<{
    query: { 
        page: number;
        limit: number;
    };
}> & {
    properties: {
        query: TransformableSchemaInterface;
    };
};

export default inputType;
