import { vec3 } from "gl-matrix";
import ModelLoader from "../ModelLoader";
import StarShader from "../shaders/StarShader";
import Object, { Mesh, Transform } from "./Object";
const perlinNoise3d = require('perlin-noise-3d');



export default class Clouds extends Object {

    public static create(gl: WebGL2RenderingContext) {
        let clouds = new Clouds(new Transform, new Mesh([], []), StarShader(gl));

        clouds.getTransform().setPosition([0, 0, -2.5]);
        clouds.getTransform().setRotation([0,0,0]);

        return clouds;
    }

    private updateModel() {
        let verts: vec3[] = [];
        let indicies: number[] = [];

        const radius = 1.1;
        const resolution = 100;

        const noise = new perlinNoise3d();
        noise.noiseSeed(0);

        for(let q = 0; q < 2 * Math.PI; q += Math.PI / resolution) {
            for(let w = - Math.PI/2; w < Math.PI/2; w += Math.PI / resolution) {
                let x = radius * Math.cos(q) * Math.cos(w);
                let y = radius * Math.cos(q) * Math.sin(w);
                let z = radius * Math.sin(q);

                let scale = (2 * noise.get(x - Date.now() / 5000, y, z) - 1.3)/3;

                if(scale <= 0) continue;

                verts.push([x - scale, y - scale, z])
                verts.push([x + scale, y - scale, z])
                verts.push([x - scale, y + scale, z])
                verts.push([x + scale, y + scale, z])
                
                indicies.push(verts.length - 4, verts.length - 3, verts.length - 2, verts.length - 2, verts.length - 1, verts.length - 3);
            }
        }

        this.mesh.vertices = verts;
        this.mesh.indicies = indicies;
    }

    public Update(): void {
        this.updateModel();
    }
}