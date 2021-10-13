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
        mat4.perspective(this.projectionMatrix, (80 * Math.PI) / 180, width/height, 0.1, 100);
        //mat4.ortho(this.projectionMatrix, 0-width/2, width/2, height/2, 0-height/2, 0.1, 100);
    }

    public getViewMatrix() {
        mat4.fromRotationTranslation(this.matrix, this.rotation, this.position);
        //mat4.invert(this.matrix, this.matrix);

        return this.matrix;
    }

    public getProjectionMatrix() {
        return this.projectionMatrix;
    }
}