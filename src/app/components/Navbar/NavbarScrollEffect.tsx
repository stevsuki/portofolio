"use client";

import { useEffect, useRef, useState } from "react";

type NavbarScrollEffectProps = Readonly<{ children: React.ReactNode; forceSolid?: boolean }>;

export default function NavbarScrollEffect({ children, forceSolid = false }: NavbarScrollEffectProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const progressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 8);

			// Written straight to the DOM rather than through state: this runs on
			// every scroll frame and must not re-render the tree.
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
			progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
		};

		const handleScroll = () => {
			frame ||= requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	const isSolid = forceSolid || isScrolled;

	return (
		<div className="fixed top-0 left-0 right-0 z-50">
			<div
				className={`relative transition-all duration-500 ${
					isSolid
						? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-line shadow-[0_8px_30px_-20px_rgba(15,23,42,0.6)]"
						: "bg-transparent border-b border-transparent"
				}`}
			>
				{children}
				<div
					ref={progressRef}
					aria-hidden="true"
					className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent via-sky-500 to-violet-500 transition-opacity duration-500 ${
						isSolid ? "opacity-100" : "opacity-0"
					}`}
					style={{ transform: "scaleX(0)" }}
				/>
			</div>
		</div>
	);
}
