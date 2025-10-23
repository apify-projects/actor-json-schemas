type Primitive = string | number | boolean | null | undefined;

interface Arr extends Array<JsonSchemaValue> {}

export type JsonSchemaValue = Primitive | Object | Arr;

export interface JsonSchemaObject {
    [member: string]: JsonSchemaValue;
    definitions?: Record<string, JsonSchemaObject>;
}
