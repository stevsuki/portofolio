"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = Readonly<{
	children: React.ReactNode;
	className?: string;
	delayMs?: number;
}>;

export default function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element || typeof IntersectionObserver === "undefined") {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
			style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
		>
			{children}
		</div>
	);
}
