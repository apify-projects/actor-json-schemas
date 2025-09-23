[](/properties/actorOutputSchemaVersion)
The version of the output schema. It's a required integer field with a minimum and maximum value of 1.
[](!/properties/actorOutputSchemaVersion)

[](/properties/description)
Description for the output schema. This text is displayed in the Output user interface.
[](!/properties/description)

[](/properties/title)
Title for the output schema.
[](!/properties/title)

[](/properties/properties)
Definition the output properties of the Actor. Its keys are the names of the output properties, and its values are objects that define each property's schema.
[](!/properties/properties)

[](/properties/properties/patternProperties)
Single output property. It must contain the `type` and `template` attributes. It can also include `title`, `description`, and `resourceType`.
[](!/properties/properties/patternProperties)

[](/properties/properties/patternProperties/^/properties/title)
Title for the specific output property.
[](!/properties/properties/patternProperties/^/properties/title)

[](/properties/properties/patternProperties/^/properties/type)
The data type of the output property's value. The schema constrains this to the string literal "string", which is a required field. The output value is always a URL, thus a string.
[](!/properties/properties/patternProperties/^/properties/type)

[](/properties/properties/patternProperties/^/properties/description)
Description for the specific output property.
[](!/properties/properties/patternProperties/^/properties/description)

[](/properties/properties/patternProperties/^/properties/template)
Definition of how the output value (a URL) is constructed. It can use text formatting with `{{variable}}` placeholders.
[](!/properties/properties/patternProperties/^/properties/template)
