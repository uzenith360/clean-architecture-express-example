import { JSONSchemaType } from "ajv";
import TransformableSchemaInterface from "../../../../utils/transformable-schema.interface";
import UserEntity from "../../../../domain/entities/user.entity";

type inputType = JSONSchemaType<{
    body: {
        email: string;
        firstName: string;
        lastName: string;
        department: string;
        designation: string;
    }
}> & {
    properties: {
        body: TransformableSchemaInterface;
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