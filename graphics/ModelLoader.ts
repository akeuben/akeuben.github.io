import { Mesh } from "./objects/Object";
import OBJModel from "obj-file-parser";
import { vec2, vec3 } from "gl-matrix";

export default class ModelLoader {
    public static async loadMesh(file: string) {
        var model = await fetch(`/assets/models/${file}.obj`);
        var objModel = await model.text();
        var rawModelData = new OBJModel(objModel).parse();

        //Load raw data into arrrays
        var verts: Array<vec3> = [];
        var normals: Array<vec3> = [];
        var uvs: Array<vec2> = [];

        console.log(process.env)

        for(let vert of rawModelData.models[0].vertices) {
            verts.push([vert.x, vert.y, vert.z]);
        }
        for(let vert of rawModelData.models[0].vertexNormals) {
            normals.push([vert.x, vert.y, vert.z]);
        }
        for(let vert of rawModelData.models[0].textureCoords) {
            uvs.push([vert.u, vert.v]);
        }

        var realVerts: Array<vec3> = [];
        var realNormals: Array<vec3> = [];
        var realUvs: Array<vec2> = [];
        var indicies: Array<number> = [];
        
        //Generate vertexData
        for(let face of rawModelData.models[0].faces) {
            for(let vert of face.vertices) {
                realVerts.push(verts[vert.vertexIndex - 1])
                realNormals.push(normals[vert.vertexNormalIndex - 1])
                realUvs.push(uvs[vert.textureCoordsIndex - 1])
                indicies.push(realVerts.length - 1);
            }
        }
        return new Mesh(realVerts, indicies, realUvs, realNormals);
    }
}