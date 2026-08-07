"use client";

import { useEffect, useRef } from "react";

type MagneticProps = Readonly<{
	children: React.ReactNode;
	className?: string;
	/** Fraction of the cursor's offset from centre that the element travels */
	strength?: number;
	/** How far outside its own box the element starts reacting, in px */
	radius?: number;
}>;

type Magnet = {
	element: HTMLElement;
	strength: number;
	radius: number;
};

// One window listener drives every magnet on the page rather than one per
// button, for the same reason `Reveal` shares a single IntersectionObserver:
// the cost should scale with the page, not with the number of instances.
const magnets = new Set<Magnet>();
let pointerX = 0;
let pointerY = 0;
let frame = 0;

function update() {
	frame = 0;

	for (const magnet of magnets) {
		const rect = magnet.element.getBoundingClientRect();
		const distanceX = pointerX - (rect.left + rect.width / 2);
		const distanceY = pointerY - (rect.top + rect.height / 2);

		// A rectangular field rather than a circular one: it matches the shape of
		// the button, so a wide pill pulls from along its length as readily as a
		// square one does from its corners.
		const inField =
			Math.abs(distanceX) <= rect.width / 2 + magnet.radius &&
			Math.abs(distanceY) <= rect.height / 2 + magnet.radius;

		if (inField) {
			magnet.element.style.setProperty("--magnet-x", `${distanceX * magnet.strength}px`);
			magnet.element.style.setProperty("--magnet-y", `${distanceY * magnet.strength}px`);
			magnet.element.dataset.pulled = "true";
		} else if (magnet.element.dataset.pulled) {
			// Only cleared once, on the frame the cursor leaves — clearing every
			// frame would fight the release transition the whole way back.
			magnet.element.style.removeProperty("--magnet-x");
			magnet.element.style.removeProperty("--magnet-y");
			delete magnet.element.dataset.pulled;
		}
	}
}

function handlePointerMove(event: PointerEvent) {
	pointerX = event.clientX;
	pointerY = event.clientY;
	frame ||= requestAnimationFrame(update);
}

function register(magnet: Magnet) {
	magnets.add(magnet);
	if (magnets.size === 1) {
		window.addEventListener("pointermove", handlePointerMove, { passive: true });
	}

	return () => {
		magnets.delete(magnet);
		if (magnets.size > 0) return;
		window.removeEventListener("pointermove", handlePointerMove);
		if (frame) cancelAnimationFrame(frame);
		frame = 0;
	};
}

/**
 * Draws its content towards an approaching cursor and releases it once the
 * cursor leaves. Reserved for the calls to action a visitor is meant to reach
 * for — the pull is a hint that something is clickable, so it stops meaning
 * anything if everything on the page does it.
 */
export default function Magnetic({ children, className = "", strength = 0.28, radius = 44 }: MagneticProps) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		// Nothing to follow on a touch screen, and the whole effect is motion
		if (window.matchMedia("(pointer: coarse)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		return register({ element, strength, radius });
	}, [strength, radius]);

	return (
		<span ref={ref} className={`magnetic ${className}`}>
			{children}
		</span>
	);
}
