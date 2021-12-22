import Shader from "./Shader";

const vertex = `#version 300 es
layout (location = 0) in vec3 a_Vertices;

uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectionMatrix;

void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * vec4(a_Vertices, 1.0);
}
`;
const fragment = `#version 300 es
precision mediump float;

out vec4 outColor;

void main() {
    outColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

const StarShader: (gl: WebGL2RenderingContext) => Shader = (gl: WebGL2RenderingContext) => {
    return new Shader(gl, vertex, fragment);
}

export default StarShader;