import Object, { Mesh, Transform } from "./Object";
import StarShader from "../shaders/StarShader"
import { vec3 } from "gl-matrix";

export default class Star {
    public static create(gl: WebGL2RenderingContext) {
        let verts: vec3[] = [];
        let indicies: number[] = [];

        let radius = 75;
        let angleDelta = 0.005;

        for(let i = 0; i < 1000; i++) {
            let theta = Math.random() * 2 * Math.PI;
            let alpha = Math.random() * 2 * Math.PI;

            //Add Verts
            verts.push([radius * Math.cos(theta), radius * Math.sin(alpha), radius * Math.sin(theta)]);
            verts.push([radius * Math.cos(theta + angleDelta), radius * Math.sin(alpha), radius * Math.sin(theta + angleDelta)]);
            verts.push([radius * Math.cos(theta), radius * Math.sin(alpha + angleDelta), radius * Math.sin(theta)]);
            verts.push([radius * Math.cos(theta + angleDelta), radius * Math.sin(alpha + angleDelta), radius * Math.sin(theta + angleDelta)]);

            indicies.push(verts.length - 4, verts.length - 3, verts.length - 2, verts.length - 2, verts.length - 1, verts.length - 3);
        }
        
        return new Object(new Transform(), new Mesh(verts, indicies), StarShader(gl));
    }
}