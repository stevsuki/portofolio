"use client";

import { useEffect, useRef } from "react";

type SpotlightGroupProps = Readonly<{
	children: React.ReactNode;
	className?: string;
	/** Adds a pointer-tracked 3D tilt to every `[data-spot]` card in the group */
	tilt?: boolean;
}>;

/** Rotation at the very edge of a card. Small on purpose — past a few degrees
    the text edges start to read as blurred rather than as depth. */
const MAX_TILT_DEG = 5;

/**
 * Tracks the pointer once per group and writes its position onto whichever
 * `[data-spot]` element is under the cursor, which the `.spot` class reads as
 * a radial highlight and — when `tilt` is set — the `.tilt` class reads as a
 * rotation. Delegation keeps this to one passive listener per section
 * regardless of how many cards it holds, and the write is deferred to an
 * animation frame so a fast pointer never triggers more than one style update
 * per paint.
 */
export default function SpotlightGroup({ children, className = "", tilt = false }: SpotlightGroupProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = ref.current;
		if (!container || window.matchMedia("(pointer: coarse)").matches) return;

		// The spotlight is a colour wash and stays; the tilt is movement, so it is
		// the only half of this that reduced motion opts out of.
		const allowTilt = tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		let frame = 0;
		let target: HTMLElement | null = null;
		let tilted: HTMLElement | null = null;
		let clientX = 0;
		let clientY = 0;

		const levelOut = () => {
			if (!tilted) return;
			tilted.style.removeProperty("--tilt-x");
			tilted.style.removeProperty("--tilt-y");
			delete tilted.dataset.tilting;
			tilted = null;
		};

		const apply = () => {
			frame = 0;
			if (!target) return;
			const rect = target.getBoundingClientRect();
			target.style.setProperty("--mx", `${clientX - rect.left}px`);
			target.style.setProperty("--my", `${clientY - rect.top}px`);

			if (!allowTilt) return;
			// -0.5 at one edge of the card, +0.5 at the other. The vertical offset
			// drives rotateX negated, so the card leans away from the cursor — the
			// direction a physical card would tip if you pressed it.
			const offsetX = (clientX - rect.left) / rect.width - 0.5;
			const offsetY = (clientY - rect.top) / rect.height - 0.5;
			target.style.setProperty("--tilt-y", `${offsetX * MAX_TILT_DEG * 2}deg`);
			target.style.setProperty("--tilt-x", `${-offsetY * MAX_TILT_DEG * 2}deg`);
			target.dataset.tilting = "true";
			tilted = target;
		};

		const handlePointerMove = (event: PointerEvent) => {
			const card = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-spot]");
			// Crossing the gap between two cards has to level the previous one out,
			// or it stays frozen at whatever angle the pointer left it at.
			if (!card) {
				levelOut();
				return;
			}
			if (tilted && tilted !== card) levelOut();

			target = card;
			clientX = event.clientX;
			clientY = event.clientY;
			frame ||= requestAnimationFrame(apply);
		};

		container.addEventListener("pointermove", handlePointerMove, { passive: true });
		container.addEventListener("pointerleave", levelOut, { passive: true });
		return () => {
			container.removeEventListener("pointermove", handlePointerMove);
			container.removeEventListener("pointerleave", levelOut);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [tilt]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
