[](/properties/actorKeyValueStoreSchemaVersion)
The version of the key-value store schema. It's a required integer and must be exactly 1.
[](!/properties/actorKeyValueStoreSchemaVersion)

[](/properties/title)
The title of the key-value store schema. It's a required string.
[](!/properties/title)

[](/properties/description)
A description of the key-value store schema. It's an optional string.
[](!/properties/description)

[](/properties/type)
A constant value that must be "object", indicating the schema describes a JSON object.
[](!/properties/type)

[](/properties/collections)
A required object where each property represents a collection of files in the key-value store. Each property name is an arbitrary string that identifies the collection.
[](!/properties/collections)

[](/properties/collections/patternProperties/^)
A property within the `collections` object that defines the schema for a specific collection. The property name can be any string.
[](!/properties/collections/patternProperties/^)

[](/properties/collections/patternProperties/^/properties/title)
The title of the collection. It's an optional string.
[](!/properties/collections/patternProperties/^/properties/title)

[](/properties/collections/patternProperties/^/properties/description)
A description of the collection. It's an optional string.
[](!/properties/collections/patternProperties/^/properties/description)

[](/properties/collections/patternProperties/^/properties/contentTypes)
An array of allowed content types for the files in the collection (e.g., "application/json", "image/jpeg"). The array must contain at least one unique item. This attribute is required if `jsonSchema` is present.
[](!/properties/collections/patternProperties/^/properties/contentTypes)

[](/properties/collections/patternProperties/^/properties/keyPrefix)
Prefix for all keys in this collection. It's used when a collection contains multiple files. This attribute is mutually exclusive with `key`.
[](!/properties/collections/patternProperties/^/properties/keyPrefix)

[](/properties/collections/patternProperties/^/properties/key)
Exact key for a single file in the collection. This is used when a collection contains only one specific file. This attribute is mutually exclusive with `keyPrefix`.
[](!/properties/collections/patternProperties/^/properties/key)

[](/properties/collections/patternProperties/^/properties/jsonSchema)
A JSON schema object that defines the structure of the JSON content for files in the collection. This is only applicable when `contentTypes` includes "application/json".
[](!/properties/collections/patternProperties/^/properties/jsonSchema)
