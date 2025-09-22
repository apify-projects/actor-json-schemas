[](/properties/actorSpecification)
The version of the Actor specification, **required** and must be an integer set to `1`.
[](!/properties/actorSpecification)

[](/properties/name)
The **required** name of the Actor.
[](!/properties/name)

[](/properties/title)
A string for the title of the Actor.
[](!/properties/title)

[](/properties/description)
A string for a description of the Actor.
[](!/properties/description)

[](/properties/version)
The **required** version of the Actor, formatted as `[Number].[Number]` (e.g., `1.0`, `1.2.3`).
[](!/properties/version)

[](/properties/buildTag)
A string for the tag applied to a successful build; defaults to `latest`.
[](!/properties/buildTag)

[](/properties/environmentVariables)
An object mapping environment variable names to their string values.
[](!/properties/environmentVariables)

[](/properties/dockerfile)
A string specifying the path to the Dockerfile; defaults to `../Dockerfile`.
[](!/properties/dockerfile)

[](/properties/readme)
A string specifying the path to the README file; defaults to `../README.md`.
[](!/properties/readme)

[](/properties/minMemoryMbytes)
An integer between `128` and `32768` specifying the minimum memory in megabytes required.
[](!/properties/minMemoryMbytes)

[](/properties/maxMemoryMbytes)
An integer between `128` and `32768` specifying the maximum memory in megabytes allowed.
[](!/properties/maxMemoryMbytes)

[](/properties/input)
Path or direct definition of the Actor's input schema.
[](!/properties/input)

[](/properties/inputSchema)
Path or direct definition of the Actor's input schema.
[](!/properties/inputSchema)

[](/properties/output)
Path or direct definition of the Actor's output schema.
[](!/properties/output)

[](/properties/outputSchema)
Path or direct definition of the Actor's output schema.
[](!/properties/outputSchema)

[](/properties/storages)
An object for defining schemas for different storage types.
[](!/properties/storages)

[](/properties/storages/properties/keyValueStore)
Path or direct definition of the key-value store schema.
[](!/properties/storages/properties/keyValueStore)

[](/properties/storages/properties/dataset)
Path or direct definition of the dataset schema, defining the structure of dataset items.
[](!/properties/storages/properties/dataset)

[](/properties/storages/properties/requestQueue)
Path for direct the request queue.
[](!/properties/storages/properties/requestQueue)

[](/properties/usesStandbyMode)
A boolean to enable Standby mode for the Actor.
[](!/properties/usesStandbyMode)

[](/properties/webServerSchema)
Path or direct definition of the OpenAPI v3 schema of the Actor's web server.
[](!/properties/webServerSchema)

[](/properties/webServerMcpPath)
Path of the streamable HTTP MCP endpoint exposed by the standby Actor
[](!/properties/webServerMcpPath)
