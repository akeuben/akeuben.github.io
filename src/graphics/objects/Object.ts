import { mat4, quat, vec2, vec3 } from "gl-matrix";
import Shader from "../shaders/Shader";
import Camera from "./Camera";

export class Mesh {
    public vertices: vec3[];
    private textureCoords: vec2[];
    private normals: vec3[];

    private colours: vec3[] | undefined;

    public indicies: number[];

    constructor(vertices: vec3[], indicies: number[], textureCoords: vec2[] = [], normals: vec3[] = [], colours?: vec3[]) {
        this.vertices = vertices;
        this.indicies = indicies;
        this.textureCoords = textureCoords;
        this.normals = normals;
        this.colours = colours;
    }

    public getVerticesBuffer(gl: WebGL2RenderingContext) {
        let buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        let vertices: number[] = [];
        for(let i = 0; i < this.vertices.length; i++) {
            if(!this.vertices[i]) continue;
            vertices[i * 3] = this.vertices[i][0];
            vertices[i * 3 + 1] = this.vertices[i][1];
            vertices[i * 3 + 2] = this.vertices[i][2];
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        return buffer;
    }

    public getNormalsBuffer(gl: WebGL2RenderingContext) {
        let buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        let normals: number[] = [];
        for(let i = 0; i < this.normals.length; i++) {
            if(!this.normals[i]) continue;
            normals[i * 3] = this.normals[i][0];
            normals[i * 3 + 1] = this.normals[i][1];
            normals[i * 3 + 2] = this.normals[i][2];
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

        return buffer;
    }

    public getTextureCoordinatesBuffer(gl: WebGL2RenderingContext) {
        let buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        let uvs: number[] = [];
        for(let i = 0; i < this.textureCoords.length; i++) {
            if(!this.textureCoords[i]) continue;
            uvs[i * 2] = this.textureCoords[i][0];
            uvs[i * 2 + 1] = this.textureCoords[i][1];
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW)

        return buffer;
    }

    public getIndiciesBuffer(gl: WebGL2RenderingContext) {
        let buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(this.indicies), gl.STATIC_DRAW)

        return buffer;
    }

    public getColoursBuffer(gl: WebGL2RenderingContext) {
        if(!this.colours) return null;
        let buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        let colours: number[] = [];
        for(let i = 0; i < this.colours.length; i++) {
            if(!this.colours[i]) continue;
            colours[i * 3] = this.colours[i][0];
            colours[i * 3 + 1] = this.colours[i][1];
            colours[i * 3 + 2] = this.colours[i][2];
        }
        console.log(colours);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW)

        return buffer;
    }
}

export class Transform {
    protected position: vec3 = vec3.create();
    protected rotation: quat = quat.create();
    protected scale: vec3 = [1,1,1];

    protected matrix: mat4 = mat4.create();

    constructor() {
        this.recalculateMatrix();
    }

    public setPosition(position: vec3) {
        this.position = position;
        this.recalculateMatrix();
    }

    public getPostition() {
        return this.position;
    }

    public setRotation(rotation: quat) {
        this.rotation = rotation;
        this.recalculateMatrix();
    }

    public getRotation() {
        return this.rotation;
    }

    public setScale(scale: vec3) {
        this.scale = scale;
        this.recalculateMatrix();
    }

    public getScale() {
        return this.scale;
    }

    public getMatrix() {
        return this.matrix;
    }

    public getModelViewMatrix(camera: Camera) {
        let out: mat4 = mat4.create();
        mat4.mul(out, this.matrix, camera.getViewMatrix());
        return out;
    }

    private recalculateMatrix() {
        mat4.identity(this.matrix);
        mat4.fromRotationTranslationScale(this.matrix, this.rotation, this.position, this.scale);
    }
}

export default class Object {
    private readonly transform: Transform;
    private mesh: Mesh;
    private shader: Shader;

    constructor(transform: Transform, mesh: Mesh, shader: Shader) {
        this.transform = transform;
        this.mesh = mesh;
        this.shader = shader;
    }

    public Update() {};
    public LateUpdate() {};

    public Render(gl: WebGL2RenderingContext, camera: Camera) {
        this.shader.bind(gl);

        gl.uniformMatrix4fv(this.shader.getUniformLocation(gl, "u_ProjectionMatrix"), false, camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.getUniformLocation(gl, "u_ModelViewMatrix"), false, this.transform.getModelViewMatrix(camera))
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.getVerticesBuffer(gl));
        gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_Vertices"), 3, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_Vertices"));
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.getNormalsBuffer(gl));
        gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_Normals"), 3, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_Normals"));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.getTextureCoordinatesBuffer(gl));
        gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_TexCoords"), 2, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_TexCoords"));

        let colourBuffer = this.mesh.getColoursBuffer(gl);

        if(colourBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
            console.log(this.shader.getAttributeLocation(gl, "a_Colours"));
            gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_Colours"), 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_Colours"));
        }
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.getIndiciesBuffer(gl));
        gl.drawElements(gl.TRIANGLES, this.mesh.indicies.length, gl.UNSIGNED_INT, 0);
    }

    public getTransform() {
        return this.transform;
    }
}