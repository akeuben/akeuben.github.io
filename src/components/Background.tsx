import { useEffect, useRef, useState } from "react";
import WebGLBackground from "../graphics/WebGLBackground";
import "./Background.css"

function Background() {

    const canvas = useRef<HTMLCanvasElement>(null);

    let [backgroundEffect, setBackgroundEffect] = useState<WebGLBackground | null>(null);

    const draw = () => {
        backgroundEffect?.update();
    }

    useEffect(() => {
        //Create our background renderer
        if(canvas.current && !backgroundEffect) {
            setBackgroundEffect(new WebGLBackground(canvas.current));
        }

        let animationFrameId: number;

        //Main render function
        const render = () => {
            backgroundEffect?.update();
            animationFrameId = window.requestAnimationFrame(render)
        }
        render();

        //Resize the canvas when the window resizes
        window.addEventListener('resize', () => {
            if(canvas.current) {
                canvas.current.width = window.innerWidth;
                canvas.current.height = window.innerHeight;
                backgroundEffect?.onResize();
            }
        });

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draw])

    return <canvas id="background" width={window.innerWidth} height={window.innerHeight} ref={canvas}>
        Not supported. TODO: Replace this message with image background.
    </canvas>
}

export default Background;