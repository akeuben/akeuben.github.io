import Shader from "./Shader";

const vertex = `
attribute vec3 a_Vertices;
attribute vec3 a_Normals;
attribute vec2 a_TexCoords;

varying vec3 o_Normals;
varying vec2 o_TexCoords;

uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

void main() {
    gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vec4(a_Vertices, 1.0);
    o_Normals = a_Normals;
    o_TexCoords = a_TexCoords;
}
`;
const fragment = `
precision mediump float;

varying vec3 o_Normals;
varying vec2 o_TexCoords;

void main() {
    gl_FragColor = vec4(o_TexCoords, 1.0, 1.0);
}
`;

const TestShader: (gl: WebGL2RenderingContext) => Shader = (gl: WebGL2RenderingContext) => {
    return new Shader(gl, vertex, fragment);
}

export default TestShader;