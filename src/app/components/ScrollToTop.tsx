"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

/** How far down the page the control earns its place on screen */
const REVEAL_AFTER_PX = 520;

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A reachable way back up on long pages — the footer link only helps once you
 * have already reached the footer. The ring doubles as a reading-progress
 * readout, so the button reports where you are as well as where it takes you.
 */
export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const progressRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const scrollTop = window.scrollY;
			setIsVisible(scrollTop > REVEAL_AFTER_PX);

			// Written straight to the DOM: this runs per scroll frame and must not
			// re-render the tree (the same reason the navbar's bar is written this way).
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
			progressRef.current?.style.setProperty("stroke-dashoffset", `${CIRCUMFERENCE * (1 - progress)}`);
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

	const scrollToTop = () => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
	};

	return (
		<button
			type="button"
			onClick={scrollToTop}
			data-visible={isVisible}
			tabIndex={isVisible ? 0 : -1}
			aria-hidden={!isVisible}
			aria-label="Back to top"
			className="to-top group fixed bottom-6 right-5 sm:right-8 z-40 flex items-center justify-center w-11 h-11 rounded-full border border-line bg-[var(--background)]/80 text-muted backdrop-blur-md shadow-lg hover:text-accent hover:border-accent/60"
		>
			<svg
				className="to-top-ring absolute inset-0 w-full h-full"
				viewBox="0 0 44 44"
				fill="none"
				aria-hidden="true"
			>
				<circle
					ref={progressRef}
					className="to-top-ring-progress"
					cx="22"
					cy="22"
					r={RADIUS}
					stroke="var(--accent)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={CIRCUMFERENCE}
				/>
			</svg>
			<FiArrowUp
				size={17}
				aria-hidden="true"
				className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
			/>
		</button>
	);
}
