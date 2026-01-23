type Primitive = string | number | boolean | null | undefined;

interface Arr extends Array<JsonSchemaValue> {}

export type JsonSchemaValue = Primitive | Object | Arr;

export interface JsonSchemaObject {
    [member: string]: JsonSchemaValue;
    definitions?: Record<string, JsonSchemaObject>;
    properties?: Record<string, JsonSchemaObject>;
    description?: string;
}

export interface MissingDescription {
    jsonPointer: string;
    propertyName: string;
    parentPath: string;
}

export interface CheckResult {
    totalProperties: number;
    missingDescriptions: MissingDescription[];
    hasIssues: boolean;
}
