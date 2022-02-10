import { mat4 } from "gl-matrix";
import { Transform } from "./Object";

export default class Camera extends Transform {

    private projectionMatrix: mat4 = mat4.create();

    constructor(width: number, height: number) {
        super();
        this.recalculateProjectionMatrix(width, height);
    }

    public recalculateProjectionMatrix(width: number, height: number) {
        mat4.identity(this.projectionMatrix);
        mat4.perspective(this.projectionMatrix, (80 * Math.PI) / 180, width/height, 0.1, 1000);
        //mat4.ortho(this.projectionMatrix, 0-width/2, width/2, height/2, 0-height/2, 0.1, 100);
    }

    public getViewMatrix() {
        mat4.identity(this.matrix);
        let rot = mat4.create();
        mat4.fromQuat(rot, this.rotation);
        mat4.mul(this.matrix, this.matrix, rot);
        mat4.translate(this.matrix, this.matrix, this.position);
        mat4.invert(this.matrix, this.matrix);

        return this.matrix;
    }

    public getProjectionMatrix() {
        return this.projectionMatrix;
    }
}