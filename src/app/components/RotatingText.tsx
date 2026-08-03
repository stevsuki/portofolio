"use client";

import { useEffect, useState } from "react";

type RotatingTextProps = Readonly<{
	items: readonly string[];
	intervalMs?: number;
	className?: string;
	itemClassName?: string;
}>;

/**
 * Cross-fades between labels. Every item is rendered stacked in a single grid
 * cell so the box is always as wide as the longest label — swapping never
 * reflows the surrounding text — and only opacity/transform animate.
 */
export default function RotatingText({
	items,
	intervalMs = 2800,
	className = "",
	itemClassName = "",
}: RotatingTextProps) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (items.length < 2) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const timer = setInterval(() => setActive((current) => (current + 1) % items.length), intervalMs);
		return () => clearInterval(timer);
	}, [items.length, intervalMs]);

	return (
		<span className={`grid ${className}`} aria-live="polite">
			{items.map((item, index) => (
				<span
					key={item}
					aria-hidden={index !== active}
					className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${
						index === active ? "opacity-100 translate-y-0 blur-0" : "opacity-0 -translate-y-2 blur-[3px]"
					} ${itemClassName}`}
				>
					{item}
				</span>
			))}
		</span>
	);
}
