import { JSONSchemaType } from "ajv";

type inputType = JSONSchemaType<{}> & { properties: {} };

export default inputType;
