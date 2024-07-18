"use client"

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import ScrollArrow from "./ScrollArrow";

const str = `
cat welcome.txt[5]
<br/><br/>
\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0_\u00a0\u00a0__\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0_\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<br/>
\u00a0\u00a0\u00a0\u00a0\u00a0/\\\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0|\u00a0|/\u00a0/\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0|\u00a0|\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<br/>
\u00a0\u00a0\u00a0\u00a0/\u00a0\u00a0\\__\u00a0\u00a0\u00a0_____\u00a0_\u00a0__\u00a0_\u00a0\u00a0\u00a0_\u00a0\u00a0|\u00a0'\u00a0/\u00a0___\u00a0_\u00a0\u00a0\u00a0_|\u00a0|__\u00a0\u00a0\u00a0___\u00a0_\u00a0__\u00a0\u00a0<br/>
\u00a0\u00a0\u00a0/\u00a0/\\\u00a0\\\u00a0\\\u00a0/\u00a0/\u00a0_\u00a0\\\u00a0'__|\u00a0|\u00a0|\u00a0|\u00a0|\u00a0\u00a0<\u00a0/\u00a0_\u00a0\\\u00a0|\u00a0|\u00a0|\u00a0'_\u00a0\\\u00a0/\u00a0_\u00a0\\\u00a0'_\u00a0\\\u00a0<br/>
\u00a0\u00a0/\u00a0____\u00a0\\\u00a0V\u00a0/\u00a0\u00a0__/\u00a0|\u00a0\u00a0|\u00a0|_|\u00a0|\u00a0|\u00a0.\u00a0\\\u00a0\u00a0__/\u00a0|_|\u00a0|\u00a0|_)\u00a0|\u00a0\u00a0__/\u00a0|\u00a0|\u00a0|<br/>
\u00a0/_/\u00a0\u00a0\u00a0\u00a0\\_\\_/\u00a0\\___|_|\u00a0\u00a0\u00a0\\__,\u00a0|\u00a0|_|\\_\\___|\\__,_|_.__/\u00a0\\___|_|\u00a0|_|<br/>
\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0__/\u00a0|\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<br/>
\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0|___/\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<br/>
[100]Software Engineer | Game Developer
<br/><br/>
$ 
`

export const Hero = () => {

    const [output, setOutput] = useState<string>("$ ");

    useEffect(() => {
        let i = 0;
        let s = 100;
        const addCharacter = () => {
            setOutput("$ " + str.substring(0, i).replaceAll(/\[[0-9]*\]?/g, ""));
            i++;
            if(str[i] === '<') {
                do {
                    i++;
                } while(str[i] !== '>')
            }
            if(str[i] === '[') {
                let speed = "";
                i++;
                while(str[i] !== ']') {
                    speed += str[i]
                    i++;
                }
                s = parseInt(speed);
            }
        }

        const requestFrame = () => requestAnimationFrame(() => {
            addCharacter();
            if(i === str.length) return;
            setTimeout(() => {
                requestFrame();
            }, s)
        })

        requestFrame();
    }, [setOutput])

    const html = {
        __html: output
    }

    return <div className={styles.hero}>
        <div className={styles.background} style={{backgroundImage: "url(/assets/images/hero/gears.png)"}} />
        <div className={styles.terminal}>
            <div dangerouslySetInnerHTML={html} />
        </div>
        <ScrollArrow />
    </div>
}
