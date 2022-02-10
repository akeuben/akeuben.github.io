import { mat4, quat, vec2, vec3 } from "gl-matrix";
import { createModuleResolutionCache, textChangeRangeIsUnchanged } from "typescript";
import Shader from "../shaders/Shader";
import Texture from "../Texture";
import Camera from "./Camera";

export class Mesh {
    public vertices: vec3[];
    public textureCoords: vec2[];
    public normals: vec3[];

    public indicies: number[];

    constructor(vertices: vec3[], indicies: number[], textureCoords: vec2[] = [], normals: vec3[] = []) {
        this.vertices = vertices;
        this.indicies = indicies;
        this.textureCoords = textureCoords;
        this.normals = normals;
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

    public setRotation(rotation: quat | vec3) {
        if(rotation.length === 4) {
            this.rotation = rotation;
        } else if(rotation.length === 3) {
            quat.identity(this.rotation);
            this.addRotation(rotation);
        }
        this.recalculateMatrix();
    }

    public addRotation(rotation: vec3) {
        quat.rotateX(this.rotation, this.rotation, rotation[0]);
        quat.rotateY(this.rotation, this.rotation, rotation[1]);
        quat.rotateZ(this.rotation, this.rotation, rotation[2]);
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

    private recalculateMatrix() {
        mat4.identity(this.matrix);
        mat4.translate(this.matrix, this.matrix, this.position);
        let rot = mat4.create();
        mat4.fromQuat(rot, this.rotation);
        mat4.mul(this.matrix, this.matrix, rot);
        mat4.scale(this.matrix, this.matrix, this.scale);
    }
}

export default class Object {
    private readonly transform: Transform;
    protected mesh: Mesh;
    private texture: Texture | undefined;
    private shader: Shader;

    constructor(transform: Transform, mesh: Mesh | Promise<Mesh>, shader: Shader, texture?: Texture) {
        this.transform = transform;
        if(mesh instanceof Mesh) {
            this.mesh = mesh;
        } else {
            this.mesh = new Mesh([], [], [], []);
            mesh.then((mesh) => {
                this.mesh = mesh;
            })
        }
        this.shader = shader;

        this.texture = texture;
    }

    public Update() {};
    public LateUpdate() {};

    public Render(gl: WebGL2RenderingContext, camera: Camera) {
        this.shader.bind(gl);

        gl.uniformMatrix4fv(this.shader.getUniformLocation(gl, "u_ProjectionMatrix"), false, camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.getUniformLocation(gl, "u_ModelMatrix"), false, this.transform.getMatrix());
        gl.uniformMatrix4fv(this.shader.getUniformLocation(gl, "u_ViewMatrix"), false, camera.getViewMatrix());

        if(this.texture) {
            gl.activeTexture(gl.TEXTURE0);
            this.texture.bind(gl);
            gl.uniform1i(this.shader.getUniformLocation(gl, "u_Sampler"), 0);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.getVerticesBuffer(gl));
        gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_Vertices"), 3, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_Vertices"));
        
        if(this.shader.getAttributeLocation(gl, "a_Normals") > -1) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.getNormalsBuffer(gl));
            gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_Normals"), 3, gl.FLOAT, true, 0, 0);
            gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_Normals"));
        }

        if(this.shader.getAttributeLocation(gl, "a_TexCoords") > -1) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.getTextureCoordinatesBuffer(gl));
            gl.vertexAttribPointer(this.shader.getAttributeLocation(gl, "a_TexCoords"), 2, gl.FLOAT, true, 0, 0);
            gl.enableVertexAttribArray(this.shader.getAttributeLocation(gl, "a_TexCoords"));
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.getIndiciesBuffer(gl));
        gl.drawElements(gl.TRIANGLES, this.mesh.indicies.length, gl.UNSIGNED_INT, 0);
    }

    public getTransform() {
        return this.transform;
    }
}