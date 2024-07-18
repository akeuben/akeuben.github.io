"use client"

import styles from "./ScrollArrow.module.css";

export default function ScrollArrow() {
    return <span className={styles.arrow} onClick={() => window.scroll(window.scrollX, window.innerHeight - 64)}>˯</span>
}
