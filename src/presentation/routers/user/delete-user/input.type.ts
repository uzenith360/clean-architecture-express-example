import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";


type inputType = JSONSchemaType<{
    params: {
        id: string;
    }
}> & {
    properties: {
        params: TransformableSchemaInterface;
    };
};

export default inputType;


/**
 * type inputType = JSONSchemaType<{
    body: {
        setId: string;
        eventId: string;
        contactId: string;
        photoIds: string[];
        email: string;
        downloadPIN: string;
    };
    query: {
        search: string;
    };
}> & {
    properties: {
        body: TransformableSchemaInterface;
        query: TransformableSchemaInterface;
    };
};
 */