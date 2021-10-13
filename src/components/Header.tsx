import { useEffect, useState } from "react";
import "./Header.css";

function Header() {

    let [full, setFull] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setFull(window.scrollY < window.innerHeight - 64);
        });
    }, []);

    return <header className={full ? "full" : undefined}>
        <h1>Avery Keuben</h1>
    </header>
}

export default Header;