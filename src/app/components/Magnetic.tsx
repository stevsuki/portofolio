"use client";

import { useEffect, useRef } from "react";

type MagneticProps = Readonly<{
	children: React.ReactNode;
	className?: string;
	/** Fraction of the cursor's offset from centre that the element travels */
	strength?: number;
	/** How far outside its own box the element starts reacting, in px */
	radius?: number;
	/** Ceiling on how far the element may travel from rest, in px */
	maxOffset?: number;
}>;

type Magnet = {
	element: HTMLElement;
	strength: number;
	radius: number;
	maxOffset: number;
};

// One window listener drives every magnet on the page rather than one per
// button, for the same reason `Reveal` shares a single IntersectionObserver:
// the cost should scale with the page, not with the number of instances.
const magnets = new Set<Magnet>();
let pointerX = 0;
let pointerY = 0;
let frame = 0;

function release(element: HTMLElement) {
	// Only cleared once, on the frame the cursor leaves — clearing every frame
	// would fight the release transition the whole way back.
	if (!element.dataset.pulled) return;
	element.style.removeProperty("--magnet-x");
	element.style.removeProperty("--magnet-y");
	delete element.dataset.pulled;
}

function update() {
	frame = 0;

	// Winner takes all. There is one cursor, so only one control should follow
	// it: two buttons a small gap apart each sit inside the other's field, and
	// left to themselves both pull towards the cursor between them — that is,
	// towards each other — until they read as a single blob.
	let nearest: Magnet | null = null;
	let nearestReach = 0;
	let nearestX = 0;
	let nearestY = 0;

	for (const magnet of magnets) {
		const rect = magnet.element.getBoundingClientRect();
		const distanceX = pointerX - (rect.left + rect.width / 2);
		const distanceY = pointerY - (rect.top + rect.height / 2);

		// A rectangular field rather than a circular one: it matches the shape of
		// the button, so a wide pill pulls from along its length as readily as a
		// square one does from its corners. Normalised to 0 at the centre and 1
		// on the field boundary so magnets of different sizes stay comparable.
		const reach = Math.max(
			Math.abs(distanceX) / (rect.width / 2 + magnet.radius),
			Math.abs(distanceY) / (rect.height / 2 + magnet.radius),
		);

		if (reach > 1 || (nearest && reach >= nearestReach)) {
			release(magnet.element);
			continue;
		}

		if (nearest) release(nearest.element);
		nearest = magnet;
		nearestReach = reach;
		nearestX = distanceX;
		nearestY = distanceY;
	}

	if (!nearest) return;

	// Ease the pull out to nothing at the boundary. Without it the offset is at
	// its largest exactly where the cursor leaves, so the button springs back
	// from its furthest point — and travels far enough on the way to reach its
	// neighbour. The cap is the backstop for magnets wide enough that even the
	// damped pull would carry them into whatever sits beside them.
	const falloff = 1 - nearestReach;
	const limit = nearest.maxOffset;
	const offsetX = clamp(nearestX * nearest.strength * falloff, limit);
	const offsetY = clamp(nearestY * nearest.strength * falloff, limit);

	nearest.element.style.setProperty("--magnet-x", `${offsetX}px`);
	nearest.element.style.setProperty("--magnet-y", `${offsetY}px`);
	nearest.element.dataset.pulled = "true";
}

function clamp(value: number, limit: number) {
	return Math.min(Math.max(value, -limit), limit);
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
export default function Magnetic({
	children,
	className = "",
	strength = 0.35,
	radius = 44,
	maxOffset = 10,
}: MagneticProps) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		// Nothing to follow on a touch screen, and the whole effect is motion
		if (window.matchMedia("(pointer: coarse)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		return register({ element, strength, radius, maxOffset });
	}, [strength, radius, maxOffset]);

	return (
		<span ref={ref} className={`magnetic ${className}`}>
			{children}
		</span>
	);
}
