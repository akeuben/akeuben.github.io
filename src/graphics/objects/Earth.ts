import ModelLoader from "../ModelLoader";
import TestShader from "../shaders/TestShader";
import Texture from "../Texture";
import Object, { Transform } from "./Object";

export default class Earth extends Object {
    
    public constructor(gl: WebGL2RenderingContext) {
        super(new Transform(), ModelLoader.loadMesh("Earth"), TestShader(gl), new Texture("colour_palette_1", gl));
        this.getTransform().setPosition([0, 0, -5]);
    }

    private t = 0;

    public override Update() {
        this.getTransform().addRotation([0, .01, 0]);
        this.getTransform().setScale([1 * Math.sin(this.t) + 2, 1 * Math.sin(this.t) + 2, 1 * Math.sin(this.t) + 2]);
        this.t += 0.01;
    }
}