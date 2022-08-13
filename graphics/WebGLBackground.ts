import Camera from "./objects/Camera";
import CameraController from "./objects/CameraController";
import Clouds from "./objects/Clouds";
import Earth from "./objects/Earth";
import Object from "./objects/Object";
import Star from "./objects/Star";

export default class WebGLBackground {

    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext | null;

    private scene: Array<Object> = [];
    private camera: Camera;

    private legacyRender: boolean = false;

    constructor(canvas: HTMLCanvasElement, mode: 'main' | 'sub') {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl2");

        this.legacyRender = this.gl == null;

        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.camera.setPosition([0, 0, 0]);

        this.gl?.enable(this.gl.DEPTH_TEST);

        this.scene.push(new Earth(this.gl as WebGL2RenderingContext));
        this.scene.push(new CameraController(this.gl as WebGL2RenderingContext, mode));
        this.scene.push(Star.create(this.gl as WebGL2RenderingContext));
        //this.scene.push(Clouds.create(this.gl as WebGL2RenderingContext));
    }

    public onResize() {
        this.gl?.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.camera.recalculateProjectionMatrix(this.canvas.width, this.canvas.height);
    }

    public update() {
        if(!this.gl) return;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        let buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer as WebGLBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, 3, this.gl?.STATIC_DRAW);

        for(let object of this.scene) {
            object.Update();
            object.Render(this.gl, this.camera);
            object.LateUpdate();
        }
    }
}