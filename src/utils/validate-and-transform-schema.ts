import { Request, Response, NextFunction } from 'express';
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import TransformableSchemaInterface from './transformable-schema.interface';

// Extend the AJV instance to support string transformations
const ajv = new Ajv({ allErrors: true, coerceTypes: true });
addFormats(ajv);

// User defined transformation functions.
const transformations: { [key: string]: (value: any) => any } = {
    trim: (value: string) => value?.trim(),
    toLowerCase: (value: string) => value?.toLowerCase(),
    toUpperCase: (value: string) => value?.toUpperCase(),
};

// Apply transformations recursively
const applyTransformations = (olddata: any, schema: TransformableSchemaInterface): any => {
    const data = { ...olddata };

    if (schema.properties) {
        for (const [key, value] of Object.entries(schema.properties)) {
            if (data[key] !== undefined) {
                if (value.type === 'object') {
                    applyTransformations(data[key], value);
                } else if (value.type === 'array' && value.items && typeof value.items === 'object') {
                    data[key] = data[key].map((item: any) =>
                        applyTransformations({ item }, { type: 'object', properties: { item: value.items } }).item
                    );
                } else if (value.transform && Array.isArray(value.transform)) {
                    value.transform.forEach((transformName: string) => {
                        if (transformations[transformName]) {
                            data[key] = transformations[transformName](data[key]);
                        }
                    });
                }
            }
        }
    }
    return data;
}

function removeTransformProperty(schema: TransformableSchemaInterface): TransformableSchemaInterface {
    if (typeof schema !== 'object' || schema === null) {
        return schema;
    }

    const { transform, items, properties, ...rest } = schema;

    return {
        ...rest,
        ...(properties && {
            properties: Object.fromEntries(
                Object.entries(properties).map(([key, value]) => [key, removeTransformProperty(value)])
            )
        }),
        ...(items && { items: removeTransformProperty(items) })
    };
}

// Middleware to validate and transform the schema
export default <T>(schema: JSONSchemaType<T> & { properties: { [key: string]: TransformableSchemaInterface } }) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const schemaProperties = schema.properties || {};

        try {
            for (const location of Object.keys(schemaProperties)) {
                const rules = schemaProperties[location];
                const rulesWithoutTransforms = removeTransformProperty(rules);

                if ((req as any)[location]) {
                    // Apply Transformations
                    let dataToValidate = applyTransformations((req as any)[location], rules);

                    // Validate the transformed data
                    const validate = ajv.compile(rulesWithoutTransforms) as ValidateFunction<T>;
                    if (!validate(dataToValidate)) {
                        res.status(400).json({
                            errors: validate.errors?.map((error) => ({
                                message: error.message,
                                path: error.instancePath,
                            })),
                        });

                        return;
                    }

                    // Update the request with transformed data
                    (req as any)[location] = dataToValidate;
                }
            }
        } catch (e) {
            console.error(e);

            res.status(500).json({
                message: 'Internal server error',
            });

            return;
        }

        // Proceed to the next middleware/route handler
        next();
    };
}
