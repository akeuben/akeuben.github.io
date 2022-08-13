import { useEffect, useRef, useState } from "react";
import WebGLBackground from "../graphics/WebGLBackground";
import style from "./Background.module.css"

function Background({mode}: {mode: 'main' | 'sub'}) {

    const canvas = useRef<HTMLCanvasElement>(null);

    let [backgroundEffect, setBackgroundEffect] = useState<WebGLBackground | null>(null);

    const draw = () => {
        backgroundEffect?.update();
    }

    useEffect(() => {
        //Create our background renderer
        if(canvas.current && !backgroundEffect) {
            setBackgroundEffect(new WebGLBackground(canvas.current, mode));
        }

        let animationFrameId: number;

        //Main render function
        const render = () => {
            backgroundEffect?.update();
            animationFrameId = window.requestAnimationFrame(render)
        }
        render();

        //Resize the canvas when the window resizes
        const onResize = () => {
            if(canvas.current) {
                canvas.current.width = document.body.clientWidth;
                canvas.current.height = document.body.clientHeight;
                backgroundEffect?.onResize();
            }
        }
        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas className={style.background} width={800} height={600} ref={canvas}>
        Not supported. TODO: Replace this message with image background.
    </canvas>
}

export default Background;