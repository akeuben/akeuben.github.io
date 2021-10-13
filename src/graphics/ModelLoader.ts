import { Mesh } from "./objects/Object";
import OBJModel from "obj-file-parser";
import { vec2, vec3 } from "gl-matrix";
const MTLFile = require('mtl-file-parser');

export default class ModelLoader {
    public static async loadMesh(file: string) {
        var model = await fetch(process.env.PUBLIC_URL + `/assets/models/${file}.obj`);
        var materials = await fetch(process.env.PUBLIC_URL + `/assets/models/${file}.mtl`);
        var objModel = await model.text();
        var objMaterial = await materials.text();
        var rawModelData = new OBJModel(objModel).parse();
        var rawMaterialData = new MTLFile(objMaterial).parse();

        //Load raw data into arrrays
        var verts: Array<vec3> = [];
        var normals: Array<vec3> = [];
        var uvs: Array<vec2> = [];
        var colours: Array<vec3> = [];

        var mats: Record<string, vec3> = {};

        for(let vert of rawModelData.models[0].vertices) {
            verts.push([vert.x, vert.y, vert.z]);
        }
        for(let vert of rawModelData.models[0].vertexNormals) {
            normals.push([vert.x, vert.y, vert.z]);
        }
        for(let vert of rawModelData.models[0].textureCoords) {
            uvs.push([vert.u, vert.v]);
        }

        for(let material of rawMaterialData) {
            mats[material.name] = [material.Kd.red, material.Kd.green, material.Kd.blue];
        }

        console.log(mats);
        
        //Generate vertexData
        var indicies: Array<number> = [];
        for(let face of rawModelData.models[0].faces) {
            for(let vert of face.vertices) {
                indicies.push(vert.vertexIndex -1);
                colours[vert.vertexIndex -1] = mats[face.material];
            }
        }
        console.log(colours);
        return new Mesh(verts, indicies, uvs, normals, colours);
    }
}

class VertexData {
    public vertex: vec3;
    public normal: vec3;
    public uv: vec2;

    public constructor(vertex: vec3, normal: vec3, uv: vec2) {
        this.vertex = vertex;
        this.normal = normal;
        this.uv = uv;
    }
}