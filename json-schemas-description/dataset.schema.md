[](/properties/actorSpecification)
Specifies the version of the dataset schema structure document. Only version 1 is currently supported.
[](!/properties/actorSpecification)

[](/properties/title)
The title of the Actor dataset schema.
[](!/properties/title)

[](/properties/description)
The description of the Actor dataset schema.
[](!/properties/description)

[](/properties/fields)
A JSON schema compatible object that defines the schema for a single dataset object. It uses JSON Schema Draft 2020-12 or other compatible formats.
[](!/properties/fields)

[](/properties/views)
An object containing descriptions of API and UI views for the dataset.
[](!/properties/views)

[](/properties/views/^)
Represents a specific view definition within the `views` object. The `^` symbol in the schema's `patternProperties` indicates that the key can be any string (e.g., "overview"). A view must have either a `title` and `transformation` or a `title` and `display`.
[](!/properties/views/^)

[](/properties/views/patternProperties/^/properties/title)
The title of the view, which is visible in the UI's Output tab and in the API.
[](!/properties/views/patternProperties/^/properties/title)

[](/properties/views/patternProperties/^/properties/description)
The description of the view, which is only available in the API response.
[](!/properties/views/patternProperties/^/properties/description)

[](/properties/views/patternProperties/^/properties/transformation)
The definition of data transformation applied when dataset data is loaded from the Dataset API.
[](!/properties/views/patternProperties/^/properties/transformation)

[](/properties/views/patternProperties/^/properties/transformation/properties/fields)
An array of strings that selects the fields to be presented in the output. The order of the fields determines the order of the columns in the UI visualization.
[](!/properties/views/patternProperties/^/properties/transformation/properties/fields)

[](/properties/views/patternProperties/^/properties/transformation/properties/clean)
A boolean flag. When true, it removes fields from the output that are not specified in the `fields` array.
[](!/properties/views/patternProperties/^/properties/transformation/properties/clean)

[](/properties/views/patternProperties/^/properties/transformation/properties/omit)
An array of strings that specifies fields to be removed from the output. Nested field names can also be used.
[](!/properties/views/patternProperties/^/properties/transformation/properties/omit)

[](/properties/views/patternProperties/^/properties/transformation/properties/unwind)
An array of strings that specifies fields to deconstruct nested children into a parent object, effectively flattening the structure.
[](!/properties/views/patternProperties/^/properties/transformation/properties/unwind)

[](/properties/views/patternProperties/^/properties/transformation/properties/flatten)
An array of strings that specifies nested objects to transform into a flat structure.
[](!/properties/views/patternProperties/^/properties/transformation/properties/flatten)

[](/properties/views/patternProperties/^/properties/transformation/properties/desc)
A boolean flag. If `true`, results are sorted in descending order based on the time they were written to the dataset (newest first). By default, they are sorted in ascending order.
[](!/properties/views/patternProperties/^/properties/transformation/properties/desc)

[](/properties/views/patternProperties/^/properties/transformation/properties/skipHidden)
A boolean flag. If `true`, fields marked as hidden in the original schema are skipped.
[](!/properties/views/patternProperties/^/properties/transformation/properties/skipHidden)

[](/properties/views/patternProperties/^/properties/transformation/properties/skipEmpty)
A boolean flag. If `true`, empty fields are skipped.
[](!/properties/views/patternProperties/^/properties/transformation/properties/skipEmpty)

[](/properties/views/patternProperties/^/properties/display)
The definition for the visual presentation of the data in the Output tab UI.
[](!/properties/views/patternProperties/^/properties/display)

[](/properties/views/patternProperties/^/properties/display/properties/component)
A string that specifies the type of UI component to use for displaying the data. The only valid value is "table" or "grid".
[](!/properties/views/patternProperties/^/properties/display/properties/component)

[](/properties/views/patternProperties/^/properties/display/properties/options)
An object for passing additional options to the display component. The specific properties depend on the `component` used.
[](!/properties/views/patternProperties/^/properties/display/properties/options)

[](/properties/views/patternProperties/^/properties/display/properties/properties)
An object where keys match the `transformation.fields` and values are `ViewDisplayProperty` objects. It is used to customize the display of specific columns, such as their label or format.
[](!/properties/views/patternProperties/^/properties/display/properties/properties)
