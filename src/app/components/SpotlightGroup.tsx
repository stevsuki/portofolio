"use client";

import { useEffect, useRef } from "react";

type SpotlightGroupProps = Readonly<{
	children: React.ReactNode;
	className?: string;
}>;

/**
 * Tracks the pointer once per group and writes its position onto whichever
 * `[data-spot]` element is under the cursor, which the `.spot` class reads as
 * a radial highlight. Delegation keeps this to one passive listener per
 * section regardless of how many cards it holds, and the write is deferred to
 * an animation frame so a fast pointer never triggers more than one style
 * update per paint.
 */
export default function SpotlightGroup({ children, className = "" }: SpotlightGroupProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = ref.current;
		if (!container || window.matchMedia("(pointer: coarse)").matches) return;

		let frame = 0;
		let target: HTMLElement | null = null;
		let clientX = 0;
		let clientY = 0;

		const apply = () => {
			frame = 0;
			if (!target) return;
			const rect = target.getBoundingClientRect();
			target.style.setProperty("--mx", `${clientX - rect.left}px`);
			target.style.setProperty("--my", `${clientY - rect.top}px`);
		};

		const handlePointerMove = (event: PointerEvent) => {
			const card = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-spot]");
			if (!card) return;
			target = card;
			clientX = event.clientX;
			clientY = event.clientY;
			frame ||= requestAnimationFrame(apply);
		};

		container.addEventListener("pointermove", handlePointerMove, { passive: true });
		return () => {
			container.removeEventListener("pointermove", handlePointerMove);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
