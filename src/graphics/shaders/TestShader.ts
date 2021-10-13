import Shader from "./Shader";

const vertex = `#version 300 es
layout (location = 0) in vec3 a_Vertices;
layout (location = 1) in vec3 a_Normals;
layout (location = 2) in vec2 a_TexCoords;

out vec3 o_Normals;
out vec2 o_TexCoords;

uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

void main() {
    gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vec4(a_Vertices, 1.0);
    o_Normals = a_Normals;
    o_TexCoords = a_TexCoords;
}
`;
const fragment = `#version 300 es
precision mediump float;

uniform sampler2D u_Sampler;

in vec3 o_Normals;
in vec2 o_TexCoords;

out vec4 outColor;

void main() {
    outColor = texture(u_Sampler, o_TexCoords);
}
`;

const TestShader: (gl: WebGL2RenderingContext) => Shader = (gl: WebGL2RenderingContext) => {
    return new Shader(gl, vertex, fragment);
}

export default TestShader;