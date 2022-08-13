import { ReactNode, ReactPortal, useEffect, useState } from "react";
import style from "./AnimatedMainContent.module.css"


const AnimatedMainContent = (props: any) => {
    const [opacity, setOpacity] = useState(50);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setOpacity((window.scrollY));
		})
        console.log('added scroll');
	}, [])
    return (
        <main className={style.main} style={{backgroundColor: `rgba(64,64,64,${opacity/1000 < 0.75 ? opacity/1000 : 0.75})`, backdropFilter: `blur(${Math.round(opacity / 10) < 20 ? Math.round(opacity / 10) : 20}px)`}}>
            {props.children}
        </main>
    )
}

export const StaticMainContent = (props: any) => {
    return <main className={style.static}>
        {props.children}
    </main>;    
}

export default AnimatedMainContent;