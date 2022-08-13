import TestShader from "../shaders/EarthShader";
import Camera from "./Camera";
import Object, { Mesh, Transform } from "./Object";

export default class CameraController extends Object {

    private mode;

    public constructor(gl: WebGL2RenderingContext, mode: 'main' | 'sub') {
        super(new Transform(), new Mesh([], [], [], []), TestShader(gl), undefined);
        this.mode = mode;
    }

    Render(gl: WebGL2RenderingContext, camera: Camera) {
        const height = document.body.clientHeight;
        const scroll = window.scrollY > document.body.clientHeight || this.mode == 'sub' ? document.body.clientHeight : window.scrollY;
        camera.setPosition([0, -(scroll / (height * 1.35)), -((scroll * scroll) / (height * 1000))]);
        camera.setRotation([(scroll / (height * 1)) - (this.mode == 'sub' ? 0.65 : 0), 0, 0]);
    }
}