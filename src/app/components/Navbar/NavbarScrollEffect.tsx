"use client";

import { useEffect, useState } from "react";

type NavbarScrollEffectProps = Readonly<{ children: React.ReactNode }>;

export default function NavbarScrollEffect({ children }: NavbarScrollEffectProps) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = window.scrollY > 10;
			setIsScrolled(scrolled);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-white/10 backdrop-blur shadow-lg" : "bg-transparent"
			}`}
		>
			{children}
		</div>
	);
}
