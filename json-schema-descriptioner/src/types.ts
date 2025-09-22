type Primitive = string | number | boolean | null | undefined;

interface Arr extends Array<Value> {}

type Value = Primitive | Object | Arr;

export interface JsonObject {
    [member: string]: Value;
}
