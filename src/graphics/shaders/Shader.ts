export default class Shader {

    private vertex: WebGLShader | null;
    private fragment: WebGLShader | null;

    private program!: WebGLProgram;

    private attributeLocations: Record<string, number> = {};
    private uniformLocations: Record<string, WebGLUniformLocation> = {};

    constructor(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
        this.vertex = this.loadShader(gl, gl.VERTEX_SHADER, vertexSource);
        this.fragment = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        if(!this.vertex || !this.fragment) return;

        this.program = gl.createProgram() as WebGLProgram;
        gl.attachShader(this.program, this.vertex);
        gl.attachShader(this.program, this.fragment);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.program));
            return;
        }
    }

    private loadShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
        let shader = gl.createShader(type) as WebGLShader;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    public getAttributeLocation(gl: WebGL2RenderingContext, name: string) {
        if(this.attributeLocations[name]) {
            return this.attributeLocations[name];
        }

        let location = gl.getAttribLocation(this.program, name);
        this.attributeLocations[name] = location;
        return location;
    }

    public getUniformLocation(gl: WebGL2RenderingContext, name: string) {
        if(this.uniformLocations[name]) {
            return this.uniformLocations[name];
        }

        let location = gl.getUniformLocation(this.program, name);
        if(!location) return null;
        this.uniformLocations[name] = location;
        return location;
    }

    public bind(gl: WebGL2RenderingContext) {
        gl.useProgram(this.program);
    }
}