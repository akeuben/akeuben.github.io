import TestShader from "../shaders/EarthShader";
import Camera from "./Camera";
import Object, { Mesh, Transform } from "./Object";

export default class CameraController extends Object {

    public constructor(gl: WebGL2RenderingContext) {
        super(new Transform(), new Mesh([], [], [], []), TestShader(gl), undefined);
    }

    Render(gl: WebGL2RenderingContext, camera: Camera) {
        camera.setPosition([0, -(window.scrollY / (document.body.scrollHeight * 1.35)), -((window.scrollY * window.scrollY) / (document.body.scrollHeight * 1000))]);
        camera.setRotation([(window.scrollY / (document.body.scrollHeight * 1)), 0, 0]);
    }
}