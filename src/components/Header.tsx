import { useEffect, useState } from "react";
import "./Header.css";

function Header() {

    let [full, setFull] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setFull(window.scrollY < window.innerHeight);
        });
    }, []);

    return <header className={full ? "full" : "basic"}>
        <h1>Avery Keuben</h1>
    </header>
}

export default Header;