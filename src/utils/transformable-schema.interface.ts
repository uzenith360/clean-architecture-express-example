export default interface TransformableSchemaInterface {
    type: string;
    properties: { [key: string]: TransformableSchemaInterface | any };
    items?: TransformableSchemaInterface;
    transform?: string[];
    required?: string[];
    additionalProperties?: boolean;
}