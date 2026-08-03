"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

type RevealProps = Readonly<{
	children: React.ReactNode;
	className?: string;
	delayMs?: number;
	variant?: RevealVariant;
}>;

// One IntersectionObserver is shared by every Reveal on the page instead of
// one per instance, so a section with a dozen staggered items still costs a
// single observer.
let sharedObserver: IntersectionObserver | null = null;
const pending = new WeakMap<Element, () => void>();

function observe(element: Element, onVisible: () => void) {
	if (typeof IntersectionObserver === "undefined") {
		onVisible();
		return () => {};
	}

	sharedObserver ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				pending.get(entry.target)?.();
				pending.delete(entry.target);
				sharedObserver?.unobserve(entry.target);
			}
		},
		{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
	);

	pending.set(element, onVisible);
	sharedObserver.observe(element);

	return () => {
		pending.delete(element);
		sharedObserver?.unobserve(element);
	};
}

export default function Reveal({ children, className = "", delayMs = 0, variant = "up" }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) {
			setIsVisible(true);
			return;
		}
		return observe(element, () => setIsVisible(true));
	}, []);

	return (
		<div
			ref={ref}
			className={`reveal reveal-${variant} ${isVisible ? "reveal-visible" : ""} ${className}`}
			style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
		>
			{children}
		</div>
	);
}
