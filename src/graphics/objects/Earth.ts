import ModelLoader from "../ModelLoader";
import TestShader from "../shaders/EarthShader";
import Texture from "../Texture";
import Object, { Transform } from "./Object";

export default class Earth extends Object {
    
    public constructor(gl: WebGL2RenderingContext) {
        super(new Transform(), ModelLoader.loadMesh("Earth"), TestShader(gl), new Texture("colour_palette_1", gl));
        this.getTransform().setPosition([0, 0, -2.5]);
    }

    public override Update() {
        this.getTransform().addRotation([0, .0025, 0]);
    }
}