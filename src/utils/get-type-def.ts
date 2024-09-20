import TransformableSchemaInterface from "./transformable-schema.interface";

type GetTypeForSchema<T extends TransformableSchemaInterface, R extends boolean = false> =
    T['type'] extends 'object'
        ? R extends true
            ? { [K in keyof T['properties']]: GetTypeForSchema<T['properties'][K], true> }
            : { [K in keyof T['properties']]?: GetTypeForSchema<T['properties'][K], false> } &
              { [K in Extract<T['required'], readonly string[]>[number]]: GetTypeForSchema<T['properties'][K], true> }
        : T['type'] extends 'array'
        ? GetTypeForSchema<NonNullable<T['items']>, R>[]
        : T['type'] extends 'string'
        ? string
        : T['type'] extends 'number'
        ? number
        : T['type'] extends 'boolean'
        ? boolean
        : unknown;

        type GetTypeDef<T extends Record<string, TransformableSchemaInterface>> = {
            [K in keyof T]: GetTypeForSchema<T[K]>;
        };

export default GetTypeDef;