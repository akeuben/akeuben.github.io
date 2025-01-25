"use client"

import Link from "next/link";
import styles from "./NavBar.module.css";
import { Icon, LogoGithubIcon, MarkGithubIcon, ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const NavBar = () => {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('resize', () => setIsDesktop(window.innerWidth >= 700));
        setIsDesktop(typeof window != "undefined" ? window.innerWidth >= 700 : true);
    }, [setIsDesktop]);

    return <>
        <div className={styles.spacer}/>
        <div className={[styles.navbar, isDesktop ? styles.desktop : styles.mobile].join(" ")}>
            <span>&lt;Avery<br/>&nbsp;Keuben/&gt;</span>
            <div className={[styles.links, hamburgerOpen ? undefined : styles.closed].join(" ")}>
                <NavbarLink name="Home" path="/" />
                <NavbarLink name="Posts" path="/posts" />
                <NavbarLink name="Projects" path="/projects" />
                <NavbarLink name="Resumé" path="/resume" />               
                <div>
                    <NavbarIcon icon={<MarkGithubIcon />} path="https://github.com/Kappabyte" />
                </div>
            </div>
            {!isDesktop && <div className={styles.hamburger} onClick={() => setHamburgerOpen(!hamburgerOpen)}>{hamburgerOpen ? <XIcon /> : <ThreeBarsIcon />}</div>}
        </div>
    </>
}

const NavbarLink = ({name, path}: {name: string, path: string}) => {
    const currentPath = usePathname();

    return <Link className={currentPath === path ? styles.selected : undefined} href={path}>{name}</Link>;
}

const NavbarIcon = ({icon, path}: {icon: ReturnType<Icon>, path: string}) => {
    return <Link href={path}>{icon}</Link>}
