import { ReactNode } from "react";
import styles from "./TwoCol.module.css";

export const TwoCol = ({children, fit = 'none'}: {children: [ReactNode, ReactNode], fit: 'left' | 'right' | 'none'}) => {
    return <div className={`${styles.twocol} ${styles[fit]}`}>
        {children[0]}
        {children[1]}
    </div>
}
