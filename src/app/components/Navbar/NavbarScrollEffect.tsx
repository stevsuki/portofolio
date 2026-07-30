"use client";

import { useEffect, useState } from "react";

type NavbarScrollEffectProps = Readonly<{ children: React.ReactNode; forceSolid?: boolean }>;

export default function NavbarScrollEffect({ children, forceSolid = false }: NavbarScrollEffectProps) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = window.scrollY > 10;
			setIsScrolled(scrolled);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	let backgroundClass = "bg-transparent";
	if (forceSolid) {
		backgroundClass = "bg-[#edf0f4] dark:bg-slate-900 shadow-lg";
	} else if (isScrolled) {
		backgroundClass = "bg-slate-900/5 dark:bg-white/10 backdrop-blur shadow-lg";
	}

	return (
		<div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${backgroundClass}`}>
			{children}
		</div>
	);
}
