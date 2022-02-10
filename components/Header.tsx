import { useEffect, useState } from "react";

import styles from "./Header.module.css";

function Header() {

    return <header className={styles.header}>
        <h1>Avery Keuben</h1>
        <span></span>
        <a>Home</a>
        <a>Github</a>
        <a>Resume</a>
    </header>
}

export default Header;