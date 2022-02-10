import TestShader from "../shaders/EarthShader";
import Camera from "./Camera";
import Object, { Mesh, Transform } from "./Object";

export default class CameraController extends Object {

    public constructor(gl: WebGL2RenderingContext) {
        super(new Transform(), new Mesh([], [], [], []), TestShader(gl), undefined);
    }

    Render(gl: WebGL2RenderingContext, camera: Camera) {
        const height = document.body.clientHeight;
        const scroll = window.scrollY > document.body.clientHeight ? document.body.clientHeight : window.scrollY;
        camera.setPosition([0, -(scroll / (height * 1.35)), -((scroll * scroll) / (height * 1000))]);
        camera.setRotation([(scroll / (height * 1)), 0, 0]);
    }
}