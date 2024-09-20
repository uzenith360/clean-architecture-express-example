"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
// Extend the AJV instance to support string transformations
const ajv = new ajv_1.default({ allErrors: true, coerceTypes: true });
(0, ajv_formats_1.default)(ajv);
// User defined transformation functions.
const transformations = {
    trim: (value) => value === null || value === void 0 ? void 0 : value.trim(),
    toLowerCase: (value) => value === null || value === void 0 ? void 0 : value.toLowerCase(),
    toUpperCase: (value) => value === null || value === void 0 ? void 0 : value.toUpperCase(),
};
// Apply transformations recursively
const applyTransformations = (olddata, schema) => {
    const data = Object.assign({}, olddata);
    if (schema.properties) {
        for (const [key, value] of Object.entries(schema.properties)) {
            if (data[key] !== undefined) {
                if (value.type === 'object') {
                    applyTransformations(data[key], value);
                }
                else if (value.type === 'array' && value.items && typeof value.items === 'object') {
                    data[key] = data[key].map((item) => applyTransformations({ item }, { type: 'object', properties: { item: value.items } }).item);
                }
                else if (value.transform && Array.isArray(value.transform)) {
                    value.transform.forEach((transformName) => {
                        if (transformations[transformName]) {
                            data[key] = transformations[transformName](data[key]);
                        }
                    });
                }
            }
        }
    }
    return data;
};
function removeTransformProperty(schema) {
    if (typeof schema !== 'object' || schema === null) {
        return schema;
    }
    const { transform, items, properties } = schema, rest = __rest(schema, ["transform", "items", "properties"]);
    return Object.assign(Object.assign(Object.assign({}, rest), (properties && {
        properties: Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, removeTransformProperty(value)]))
    })), (items && { items: removeTransformProperty(items) }));
}
// Middleware to validate and transform the schema
exports.default = (schema) => {
    return (req, res, next) => {
        var _a;
        const schemaProperties = schema.properties || {};
        try {
            for (const location of Object.keys(schemaProperties)) {
                const rules = schemaProperties[location];
                const rulesWithoutTransforms = removeTransformProperty(rules);
                if (req[location]) {
                    // Apply Transformations
                    let dataToValidate = applyTransformations(req[location], rules);
                    // Validate the transformed data
                    const validate = ajv.compile(rulesWithoutTransforms);
                    if (!validate(dataToValidate)) {
                        res.status(400).json({
                            errors: (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.map((error) => ({
                                message: error.message,
                                path: error.instancePath,
                            })),
                        });
                        return;
                    }
                    // Update the request with transformed data
                    req[location] = dataToValidate;
                }
            }
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                message: 'Internal server error',
            });
            return;
        }
        // Proceed to the next middleware/route handler
        next();
    };
};
