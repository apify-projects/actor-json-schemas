# Actor Input Schema

[](/properties/$schema)
The provided documentation for Actor input schema specification does not directly describe the `$schema` property. This property is typically found in JSON Schema definition files themselves (like the provided JSON validation schema) and specifies the URI of the JSON Schema version being used.
[](!/properties/$schema)

[](/properties/title)
Any text describing your input schema.
[](!/properties/title)

[](/properties/schemaVersion)
The version of the input schema specification against which your schema is written. Currently, only version `1` is out.
[](!/properties/schemaVersion)

[](/properties/description)
Help text for the input that will be displayed above the UI fields.
[](!/properties/description)

[](/properties/type)
This is fixed and must be set to string `object`.
[](!/properties/type)

[](/properties/required)
An array of field keys that are required.
[](!/properties/required)

[](/properties/additionalProperties)
Controls if properties not listed in `properties` are allowed. Defaults to `true`. Set to `false` to make requests with extra properties fail.
[](!/properties/additionalProperties)

[](/properties/properties)
This is an object mapping each field key to its specification.
[](!/properties/properties)

[](/properties/properties/patternProperties)
The provided documentation for Actor input schema specification does not directly describe `patternProperties`. This is a JSON Schema keyword used in the JSON validation schema itself to indicate that properties matching a regular expression pattern are allowed. In the context of the Actor input schema, it implies that the `properties` object can contain any field key, as long as its value conforms to one of the defined field types (string, array, object, etc.).
[](!/properties/properties/patternProperties)

[](/definitions/stringEnumProperty/properties/enum)
Using this field, you can limit values to the given array of strings. Input will be displayed as select box.
[](!/definitions/stringEnumProperty/properties/enum)

[](/definitions/stringEnumProperty/properties/enumTitles)
Titles for the `enum` keys described.
[](!/definitions/stringEnumProperty/properties/enumTitles)

[](/definitions/stringProperty/if/properties/isSecret)
Specifies whether the input field will be stored encrypted. Only available with `textfield` and `textarea` editors.
[](!/definitions/stringProperty/if/properties/isSecret)

[](/definitions/stringProperty/then/if/properties/editor)
Visual editor used for the input field.
[](!/definitions/stringProperty/then/if/properties/editor)

[](/definitions/arrayProperty/then/properties/items)
Specifies format of the items of the array, useful mainly for multiselect (see below)

To correctly define options for multiselect, you need to define the **items** property and then provide values and (optionally) labels in **enum** and **enumTitles** properties.
[](!/definitions/arrayProperty/then/properties/items)

[](/definitions/arrayProperty/then/properties/items/properties/enum)
Using this field, you can limit values to the given array of strings. Input will be displayed as select box.
[](!/definitions/arrayProperty/then/properties/items/properties/enum)

[](/definitions/arrayProperty/then/properties/items/properties/enumTitles)
Titles for the `enum` keys described.
[](!/definitions/arrayProperty/then/properties/items/properties/enumTitles)

[](/definitions/resourceProperty/properties/resourcePermissions)
The provided documentation for Actor input schema specification does not contain a description for `resourcePermissions` in the `resourceProperty` section. It is present in the JSON validation schema, indicating permissions for the resource.
[](!/definitions/resourceProperty/properties/resourcePermissions)

[](/definitions/resourceArrayProperty/properties/resourcePermissions)
The provided documentation for Actor input schema specification does not contain a description for `resourcePermissions` in the `resourceArrayProperty` section. It is present in the JSON validation schema, indicating permissions for the resource array.
[](!/definitions/resourceArrayProperty/properties/resourcePermissions)

[](/definitions/anyProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/anyProperty/properties/type)

[](/definitions/stringEnumProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/stringEnumProperty/properties/type)

[](/definitions/stringEnumProperty/properties/editor)
Visual editor used for the input field.
[](!/definitions/stringEnumProperty/properties/editor)

[](/definitions/stringEnumProperty/properties/title)
Title of the field in UI.
[](!/definitions/stringEnumProperty/properties/title)

[](/definitions/stringEnumProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/stringEnumProperty/properties/description)

[](/definitions/stringEnumProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/stringEnumProperty/properties/default)

[](/definitions/stringEnumProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/stringEnumProperty/properties/prefill)

[](/definitions/stringEnumProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/stringEnumProperty/properties/example)

[](/definitions/stringEnumProperty/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/stringEnumProperty/properties/nullable)

[](/definitions/stringEnumProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/stringEnumProperty/properties/sectionCaption)

[](/definitions/stringEnumProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/stringEnumProperty/properties/sectionDescription)

[](/definitions/stringProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/stringProperty/properties/type)

[](/definitions/stringProperty/properties/title)
Title of the field in UI.
[](!/definitions/stringProperty/properties/title)

[](/definitions/stringProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/stringProperty/properties/description)

[](/definitions/stringProperty/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/stringProperty/properties/nullable)

[](/definitions/stringProperty/properties/editor)
Visual editor used for the input field.
[](!/definitions/stringProperty/properties/editor)

[](/definitions/stringProperty/properties/isSecret)
Specifies whether the input field will be stored encrypted. Only available with `textfield` and `textarea` editors.
[](!/definitions/stringProperty/properties/isSecret)

[](/definitions/stringProperty/then/then/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/stringProperty/then/then/properties/type)

[](/definitions/stringProperty/then/then/properties/title)
Title of the field in UI.
[](!/definitions/stringProperty/then/then/properties/title)

[](/definitions/stringProperty/then/then/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/stringProperty/then/then/properties/description)

[](/definitions/stringProperty/then/then/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/stringProperty/then/then/properties/default)

[](/definitions/stringProperty/then/then/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/stringProperty/then/then/properties/prefill)

[](/definitions/stringProperty/then/then/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/stringProperty/then/then/properties/example)

[](/definitions/stringProperty/then/then/properties/pattern)
Regular expression that will be used to validate the input. If validation fails, the Actor will not run.
[](!/definitions/stringProperty/then/then/properties/pattern)

[](/definitions/stringProperty/then/then/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/stringProperty/then/then/properties/nullable)

[](/definitions/stringProperty/then/then/properties/minLength)
Minimum length of the string.
[](!/definitions/stringProperty/then/then/properties/minLength)

[](/definitions/stringProperty/then/then/properties/maxLength)
Maximum length of the string.
[](!/definitions/stringProperty/then/then/properties/maxLength)

[](/definitions/stringProperty/then/then/properties/editor)
Visual editor used for the input field.
[](!/definitions/stringProperty/then/then/properties/editor)

[](/definitions/stringProperty/then/then/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/stringProperty/then/then/properties/sectionCaption)

[](/definitions/stringProperty/then/then/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/stringProperty/then/then/properties/sectionDescription)

[](/definitions/stringProperty/then/then/properties/dateType)
This property, which is only available with **datepicker** editor, specifies what date format should visual editor accept (The JSON editor accepts any string without validation.)

* **absolute** value enables date input in `YYYY-MM-DD` format. To parse returned string regex like this can be used: `^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`.
* **relative** value enables relative date input in `{number} {unit}` format. Supported units are: days, weeks, months, years. The input is passed to the Actor as plain text (e.g., "3 weeks"). To parse it, regex like this can be used: `^(\d+)\s*(day|week|month|year)s?$`.
* **absoluteOrRelative** value enables both absolute and relative formats and user can switch between them. It's up to Actor author to parse a determine actual used format - regexes above can be used to check whether the returned string match one of them.

Defaults to **absolute**."
[](!/definitions/stringProperty/then/then/properties/dateType)

[](/definitions/stringProperty/then/else/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/stringProperty/then/else/properties/type)

[](/definitions/stringProperty/then/else/properties/title)
Title of the field in UI.
[](!/definitions/stringProperty/then/else/properties/title)

[](/definitions/stringProperty/then/else/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/stringProperty/then/else/properties/description)

[](/definitions/stringProperty/then/else/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/stringProperty/then/else/properties/default)

[](/definitions/stringProperty/then/else/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/stringProperty/then/else/properties/prefill)

[](/definitions/stringProperty/then/else/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/stringProperty/then/else/properties/example)

[](/definitions/stringProperty/then/else/properties/pattern)
Regular expression that will be used to validate the input. If validation fails, the Actor will not run.
[](!/definitions/stringProperty/then/else/properties/pattern)

[](/definitions/stringProperty/then/else/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/stringProperty/then/else/properties/nullable)

[](/definitions/stringProperty/then/else/properties/minLength)
Minimum length of the string.
[](!/definitions/stringProperty/then/else/properties/minLength)

[](/definitions/stringProperty/then/else/properties/maxLength)
Maximum length of the string.
[](!/definitions/stringProperty/then/else/properties/maxLength)

[](/definitions/stringProperty/then/else/properties/editor)
Visual editor used for the input field.
[](!/definitions/stringProperty/then/else/properties/editor)

[](/definitions/stringProperty/then/else/properties/isSecret)
Specifies whether the input field will be stored encrypted. Only available with `textfield` and `textarea` editors.
[](!/definitions/stringProperty/then/else/properties/isSecret)

[](/definitions/stringProperty/then/else/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/stringProperty/then/else/properties/sectionCaption)

[](/definitions/stringProperty/then/else/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/stringProperty/then/else/properties/sectionDescription)

[](/definitions/stringProperty/else/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/stringProperty/else/properties/type)

[](/definitions/stringProperty/else/properties/title)
Title of the field in UI.
[](!/definitions/stringProperty/else/properties/title)

[](/definitions/stringProperty/else/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/stringProperty/else/properties/description)

[](/definitions/stringProperty/else/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/stringProperty/else/properties/example)

[](/definitions/stringProperty/else/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/stringProperty/else/properties/nullable)

[](/definitions/stringProperty/else/properties/editor)
Visual editor used for the input field.
[](!/definitions/stringProperty/else/properties/editor)

[](/definitions/stringProperty/else/properties/isSecret)
Specifies whether the input field will be stored encrypted. Only available with `textfield` and `textarea` editors.
[](!/definitions/stringProperty/else/properties/isSecret)

[](/definitions/stringProperty/else/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/stringProperty/else/properties/sectionCaption)

[](/definitions/stringProperty/else/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/stringProperty/else/properties/sectionDescription)

[](/definitions/arrayProperty/if/properties/editor)
UI editor used for input.

Editor type `select` allows the user to pick items from a select, providing multiple choices. Please check this example of how to define the multiselect field:

```json
{
    "title": "Multiselect field",
    "description": "My multiselect field",
    "type": "array",
    "editor": "select",
    "items": {
        "type": "string",
        "enum": ["value1", "value2", "value3"],
        "enumTitles": ["Label of value1", "Label of value2", "Label of value3"]
    }
}
```
[](!/definitions/arrayProperty/if/properties/editor)

[](/definitions/arrayProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/arrayProperty/properties/type)

[](/definitions/arrayProperty/properties/editor)
UI editor used for input.

Usage of this field is based on the selected editor:

* `requestListSources` - value from this field can be used as input for the [RequestList](https://crawlee.dev/api/core/class/RequestList) class from Crawlee.
* `pseudoUrls` - is intended to be used with a combination of the [PseudoUrl](https://crawlee.dev/api/core/class/PseudoUrl) class and the [enqueueLinks()](https://crawlee.dev/api/core/function/enqueueLinks) function from Crawlee.

Editor type `requestListSources` supports input in formats defined by the [sources](https://crawlee.dev/api/core/interface/RequestListOptions#sources) property of [RequestListOptions](https://crawlee.dev/api/core/interface/RequestListOptions).

Editor type `globs` maps to the Crawlee's [GlobInput](https://crawlee.dev/api/core#GlobInput) used by the [UrlPatterObject](https://crawlee.dev/api/core#UrlPatternObject).

Editor type `select` allows the user to pick items from a select, providing multiple choices. Please check this example of how to define the multiselect field:

```json
{
    "title": "Multiselect field",
    "description": "My multiselect field",
    "type": "array",
    "editor": "select",
    "items": {
        "type": "string",
        "enum": ["value1", "value2", "value3"],
        "enumTitles": ["Label of value1", "Label of value2", "Label of value3"]
    }
}
```
[](!/definitions/arrayProperty/properties/editor)

[](/definitions/arrayProperty/then/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/arrayProperty/then/properties/type)

[](/definitions/arrayProperty/then/properties/editor)
UI editor used for input.
[](!/definitions/arrayProperty/then/properties/editor)

[](/definitions/arrayProperty/then/properties/title)
Title of the field in UI.
[](!/definitions/arrayProperty/then/properties/title)

[](/definitions/arrayProperty/then/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/arrayProperty/then/properties/description)

[](/definitions/arrayProperty/then/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/arrayProperty/then/properties/default)

[](/definitions/arrayProperty/then/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/arrayProperty/then/properties/prefill)

[](/definitions/arrayProperty/then/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/arrayProperty/then/properties/example)

[](/definitions/arrayProperty/then/properties/nullable)
Specifies whether null is an allowed value.
[](!/definitions/arrayProperty/then/properties/nullable)

[](/definitions/arrayProperty/then/properties/minItems)
Minimum number of items the array can contain.
[](!/definitions/arrayProperty/then/properties/minItems)

[](/definitions/arrayProperty/then/properties/maxItems)
Maximum number of items the array can contain.
[](!/definitions/arrayProperty/then/properties/maxItems)

[](/definitions/arrayProperty/then/properties/uniqueItems)
Specifies whether the array should contain only unique values.
[](!/definitions/arrayProperty/then/properties/uniqueItems)

[](/definitions/arrayProperty/then/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/arrayProperty/then/properties/sectionCaption)

[](/definitions/arrayProperty/then/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/arrayProperty/then/properties/sectionDescription)

[](/definitions/arrayProperty/then/properties/items/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/arrayProperty/then/properties/items/properties/type)

[](/definitions/arrayProperty/else/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/arrayProperty/else/properties/type)

[](/definitions/arrayProperty/else/properties/editor)
UI editor used for input.
[](!/definitions/arrayProperty/else/properties/editor)

[](/definitions/arrayProperty/else/properties/title)
Title of the field in UI.
[](!/definitions/arrayProperty/else/properties/title)

[](/definitions/arrayProperty/else/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/arrayProperty/else/properties/description)

[](/definitions/arrayProperty/else/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/arrayProperty/else/properties/default)

[](/definitions/arrayProperty/else/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/arrayProperty/else/properties/prefill)

[](/definitions/arrayProperty/else/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/arrayProperty/else/properties/example)

[](/definitions/arrayProperty/else/properties/nullable)
Specifies whether null is an allowed value.
[](!/definitions/arrayProperty/else/properties/nullable)

[](/definitions/arrayProperty/else/properties/minItems)
Minimum number of items the array can contain.
[](!/definitions/arrayProperty/else/properties/minItems)

[](/definitions/arrayProperty/else/properties/maxItems)
Maximum number of items the array can contain.
[](!/definitions/arrayProperty/else/properties/maxItems)

[](/definitions/arrayProperty/else/properties/uniqueItems)
Specifies whether the array should contain only unique values.
[](!/definitions/arrayProperty/else/properties/uniqueItems)

[](/definitions/arrayProperty/else/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/arrayProperty/else/properties/sectionCaption)

[](/definitions/arrayProperty/else/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/arrayProperty/else/properties/sectionDescription)

[](/definitions/arrayProperty/else/properties/placeholderKey)
Placeholder displayed for key field when no value is specified. Works only with `keyValue` editor.
[](!/definitions/arrayProperty/else/properties/placeholderKey)

[](/definitions/arrayProperty/else/properties/placeholderValue)
Placeholder displayed in value field when no value is provided. Works only with `keyValue` and `stringList` editors.
[](!/definitions/arrayProperty/else/properties/placeholderValue)

[](/definitions/arrayProperty/else/properties/patternKey)
Regular expression that will be used to validate the keys of items in the array. Works only with `keyValue` editor.
[](!/definitions/arrayProperty/else/properties/patternKey)

[](/definitions/arrayProperty/else/properties/patternValue)
Regular expression that will be used to validate the values of items in the array. Works only with `keyValue` and `stringList` editors.
[](!/definitions/arrayProperty/else/properties/patternValue)

[](/definitions/objectProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/objectProperty/properties/type)

[](/definitions/objectProperty/properties/title)
Title of the field in UI.
[](!/definitions/objectProperty/properties/title)

[](/definitions/objectProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/objectProperty/properties/description)

[](/definitions/objectProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/objectProperty/properties/default)

[](/definitions/objectProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/objectProperty/properties/prefill)

[](/definitions/objectProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/objectProperty/properties/example)

[](/definitions/objectProperty/properties/patternKey)
Regular expression that will be used to validate the keys of the object.
[](!/definitions/objectProperty/properties/patternKey)

[](/definitions/objectProperty/properties/patternValue)
Regular expression that will be used to validate the values of object.
[](!/definitions/objectProperty/properties/patternValue)

[](/definitions/objectProperty/properties/nullable)
Specifies whether null is an allowed value.
[](!/definitions/objectProperty/properties/nullable)

[](/definitions/objectProperty/properties/minProperties)
Minimum number of properties the object can have.
[](!/definitions/objectProperty/properties/minProperties)

[](/definitions/objectProperty/properties/maxProperties)
Maximum number of properties the object can have.
[](!/definitions/objectProperty/properties/maxProperties)

[](/definitions/objectProperty/properties/editor)
UI editor used for input.
[](!/definitions/objectProperty/properties/editor)

[](/definitions/objectProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/objectProperty/properties/sectionCaption)

[](/definitions/objectProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/objectProperty/properties/sectionDescription)

[](/definitions/integerProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/integerProperty/properties/type)

[](/definitions/integerProperty/properties/title)
Title of the field in UI.
[](!/definitions/integerProperty/properties/title)

[](/definitions/integerProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/integerProperty/properties/description)

[](/definitions/integerProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/integerProperty/properties/default)

[](/definitions/integerProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/integerProperty/properties/prefill)

[](/definitions/integerProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/integerProperty/properties/example)

[](/definitions/integerProperty/properties/nullable)
Specifies whether null is an allowed value.
[](!/definitions/integerProperty/properties/nullable)

[](/definitions/integerProperty/properties/minimum)
Minimum allowed value.
[](!/definitions/integerProperty/properties/minimum)

[](/definitions/integerProperty/properties/maximum)
Maximum allowed value.
[](!/definitions/integerProperty/properties/maximum)

[](/definitions/integerProperty/properties/unit)
Unit displayed next to the field in UI, for example _second_, _MB_, etc.
[](!/definitions/integerProperty/properties/unit)

[](/definitions/integerProperty/properties/editor)
Visual editor used for input field.
[](!/definitions/integerProperty/properties/editor)

[](/definitions/integerProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/integerProperty/properties/sectionCaption)

[](/definitions/integerProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/integerProperty/properties/sectionDescription)

[](/definitions/booleanProperty/properties/type)
Allowed type for the input value. Cannot be mixed.
[](!/definitions/booleanProperty/properties/type)

[](/definitions/booleanProperty/properties/title)
Title of the field in UI.
[](!/definitions/booleanProperty/properties/title)

[](/definitions/booleanProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/booleanProperty/properties/description)

[](/definitions/booleanProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/booleanProperty/properties/default)

[](/definitions/booleanProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/booleanProperty/properties/prefill)

[](/definitions/booleanProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/booleanProperty/properties/example)

[](/definitions/booleanProperty/properties/nullable)
Specifies whether null is an allowed value.
[](!/definitions/booleanProperty/properties/nullable)

[](/definitions/booleanProperty/properties/groupCaption)
If you want to group multiple checkboxes together, add this option to the first of the group.
[](!/definitions/booleanProperty/properties/groupCaption)

[](/definitions/booleanProperty/properties/groupDescription)
Description displayed as help text displayed of group title.
[](!/definitions/booleanProperty/properties/groupDescription)

[](/definitions/booleanProperty/properties/editor)
Visual editor used for the input field.
[](!/definitions/booleanProperty/properties/editor)

[](/definitions/booleanProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/booleanProperty/properties/sectionCaption)

[](/definitions/booleanProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/booleanProperty/properties/sectionDescription)

[](/definitions/resourceProperty/properties/type)
Specifies the type of input - string for single value or array for multiple values
[](!/definitions/resourceProperty/properties/type)

[](/definitions/resourceProperty/properties/title)
Title of the field in UI.
[](!/definitions/resourceProperty/properties/title)

[](/definitions/resourceProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/resourceProperty/properties/description)

[](/definitions/resourceProperty/properties/editor)
Visual editor used for the input field. Defaults to `resourcePicker`.
[](!/definitions/resourceProperty/properties/editor)

[](/definitions/resourceProperty/properties/resourceType)
Type of Apify Platform resource
[](!/definitions/resourceProperty/properties/resourceType)

[](/definitions/resourceProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/resourceProperty/properties/default)

[](/definitions/resourceProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/resourceProperty/properties/prefill)

[](/definitions/resourceProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/resourceProperty/properties/example)

[](/definitions/resourceProperty/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/resourceProperty/properties/nullable)

[](/definitions/resourceProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/resourceProperty/properties/sectionCaption)

[](/definitions/resourceProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/resourceProperty/properties/sectionDescription)

[](/definitions/resourceArrayProperty/properties/type)
Specifies the type of input - string for single value or array for multiple values
[](!/definitions/resourceArrayProperty/properties/type)

[](/definitions/resourceArrayProperty/properties/title)
Title of the field in UI.
[](!/definitions/resourceArrayProperty/properties/title)

[](/definitions/resourceArrayProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/resourceArrayProperty/properties/description)

[](/definitions/resourceArrayProperty/properties/editor)
Visual editor used for the input field. Defaults to `resourcePicker`.
[](!/definitions/resourceArrayProperty/properties/editor)

[](/definitions/resourceArrayProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/resourceArrayProperty/properties/default)

[](/definitions/resourceArrayProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/resourceArrayProperty/properties/prefill)

[](/definitions/resourceArrayProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/resourceArrayProperty/properties/example)

[](/definitions/resourceArrayProperty/properties/nullable)
Specifies whether null is an allowed value.
[](!/definitions/resourceArrayProperty/properties/nullable)

[](/definitions/resourceArrayProperty/properties/minItems)
Minimum number of items the array can contain. Only for `type: array`
[](!/definitions/resourceArrayProperty/properties/minItems)

[](/definitions/resourceArrayProperty/properties/maxItems)
Maximum number of items the array can contain. Only for `type: array`
[](!/definitions/resourceArrayProperty/properties/maxItems)

[](/definitions/resourceArrayProperty/properties/uniqueItems)
Specifies whether the array should contain only unique values.
[](!/definitions/resourceArrayProperty/properties/uniqueItems)

[](/definitions/resourceArrayProperty/properties/resourceType)
Type of Apify Platform resource
[](!/definitions/resourceArrayProperty/properties/resourceType)

[](/definitions/resourceArrayProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/resourceArrayProperty/properties/sectionCaption)

[](/definitions/resourceArrayProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/resourceArrayProperty/properties/sectionDescription)

[](/definitions/anyProperty/properties/title)
Title of the field in UI.
[](!/definitions/anyProperty/properties/title)

[](/definitions/anyProperty/properties/description)
Description of the field that will be displayed as help text in Actor input UI.
[](!/definitions/anyProperty/properties/description)

[](/definitions/anyProperty/properties/default)
Default value that will be used when no value is provided.
[](!/definitions/anyProperty/properties/default)

[](/definitions/anyProperty/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!/definitions/anyProperty/properties/prefill)

[](/definitions/anyProperty/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!/definitions/anyProperty/properties/example)

[](/definitions/anyProperty/properties/nullable)
Specifies whether `null` is an allowed value.
[](!/definitions/anyProperty/properties/nullable)

[](/definitions/anyProperty/properties/editor)
Visual editor used for input.
[](!/definitions/anyProperty/properties/editor)

[](/definitions/anyProperty/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!/definitions/anyProperty/properties/sectionCaption)

[](/definitions/anyProperty/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!/definitions/anyProperty/properties/sectionDescription)

[](**/properties/default)
Default value that will be used when no value is provided.
[](!**/properties/default)

[](**/properties/nullable)
Specifies whether `null` is an allowed value.
[](!**/properties/nullable)

[](**/properties/example)
Sample value of this field for the Actor to be displayed when Actor is published in Apify Store.
[](!**/properties/example)

[](**/properties/prefill)
Value that will be prefilled in the Actor input interface.
[](!**/properties/prefill)

[](**/properties/description)
Help text for the input that will be displayed above the UI fields.
[](!**/properties/description)

[](**/properties/sectionCaption)
If this property is set, then all fields following this field (this field included) will be separated into a collapsible section with the value set as its caption. The section ends at the last field or the next field which has the  `sectionCaption` property set.
[](!**/properties/sectionCaption)

[](**/properties/sectionDescription)
If the `sectionCaption` property is set, then you can use this property to provide additional description to the section. The description will be visible right under the caption when the section is open.
[](!**/properties/sectionDescription)

[](**/properties/title)
Title of the field in UI.
[](!**/properties/title)
