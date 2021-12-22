import Shader from "./Shader";

const vertex = `#version 300 es
layout (location = 0) in vec3 a_Vertices;
layout (location = 1) in vec3 a_Normals;
layout (location = 2) in vec2 a_TexCoords;

out vec3 o_Normals;
out vec2 o_TexCoords;
out vec3 o_FragPosition;
out vec3 o_lightPosition;

uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectionMatrix;

void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * vec4(a_Vertices, 1.0);
    o_TexCoords = a_TexCoords;

    //Lighting
    vec4 positionViewSpace = u_ViewMatrix * u_ModelMatrix * vec4(a_Vertices, 1.0);
    vec3 lightPositionViewSpace = (u_ViewMatrix * vec4(-5, 5, -3, 1.0)).xyz;
    o_lightPosition = normalize(lightPositionViewSpace - positionViewSpace.xyz);
    o_Normals = normalize(u_ModelMatrix * vec4(a_Normals, 1.0)).xyz;
}
`;
const fragment = `#version 300 es
precision mediump float;

uniform sampler2D u_Sampler;

uniform vec3 u_LightColor;

in vec3 o_Normals;
in vec2 o_TexCoords;
in vec3 o_FragPosition;
in vec3 o_lightPosition;

out vec4 outColor;

void main() {
    vec3 norm = normalize(o_Normals);
    vec3 lightDir = normalize(o_lightPosition - o_FragPosition);

    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * vec3(1.0);

    vec3 result = (diffuse + vec3(0.05)) * texture(u_Sampler, o_TexCoords).xyz;
    outColor = vec4(result, 1.0);
}
`;

const TestShader: (gl: WebGL2RenderingContext) => Shader = (gl: WebGL2RenderingContext) => {
    return new Shader(gl, vertex, fragment);
}

export default TestShader;