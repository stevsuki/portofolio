"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatValueProps = Readonly<{
	value: string;
	className?: string;
}>;

const DURATION_MS = 1200;

function easeOutExpo(t: number) {
	return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

export default function AnimatedStatValue({ value, className = "" }: AnimatedStatValueProps) {
	const match = value.match(/^(\d+)(.*)$/);
	const target = match ? Number(match[1]) : null;
	const suffix = match ? match[2] : "";

	const ref = useRef<HTMLSpanElement>(null);
	const [display, setDisplay] = useState(target === null ? value : "0");

	useEffect(() => {
		const element = ref.current;
		if (!element || target === null) return;

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
			setDisplay(String(target));
			return;
		}

		let frame: number;
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				observer.disconnect();

				const start = performance.now();
				const tick = (now: number) => {
					const progress = Math.min((now - start) / DURATION_MS, 1);
					setDisplay(String(Math.round(easeOutExpo(progress) * target)));
					if (progress < 1) frame = requestAnimationFrame(tick);
				};
				frame = requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);

		observer.observe(element);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [target]);

	return (
		<span ref={ref} className={className}>
			{display}
			{suffix}
		</span>
	);
}
