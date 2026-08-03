"use client";

import { useEffect, useRef } from "react";

type DragMarqueeProps = Readonly<{
	children: React.ReactNode;
	/** Auto-scroll speed in pixels per second */
	speed?: number;
	reverse?: boolean;
	className?: string;
}>;

/**
 * Three copies of the row sit side by side. The middle one is the resting
 * window and the outer two are runway, so a hard swipe has somewhere to travel
 * before the position is wrapped back to the middle.
 */
const COPIES = [0, 1, 2];

/** How long to leave the scroll position untouched after a finger lifts, so
 *  wrapping never cuts a momentum scroll short. */
const TOUCH_SETTLE_MS = 900;

/** Gap between what we wrote and what the element reports that means something
 *  other than us moved it. Above browser rounding, below any real gesture. */
const EXTERNAL_SCROLL_THRESHOLD_PX = 3;

/**
 * An auto-scrolling strip that is also a real scroll container: touch swipe and
 * trackpad gestures come free from the browser, and mouse dragging is mapped
 * onto scrollLeft. A CSS keyframe marquee cannot do this — its transform is not
 * something the user can grab.
 *
 * The strip never pauses on hover; it only yields while a drag is in progress
 * and then picks the loop straight back up.
 */
export default function DragMarquee({ children, speed = 34, reverse = false, className = "" }: DragMarqueeProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const copyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const viewport = viewportRef.current;
		const copy = copyRef.current;
		if (!viewport || !copy) return;

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		let copyWidth = 0;
		let frame = 0;
		let lastTime = 0;
		let isDragging = false;
		let isTouchDrag = false;
		let lastPointerX = 0;
		let settleUntil = 0;

		// The animation's own position, in floats. Browsers round scrollLeft when
		// it is read back, and at this speed a frame advances well under a pixel —
		// accumulating onto the element's own value would round every step away to
		// nothing and the strip would never move.
		let position = 0;
		let lastWritten = 0;

		const wrapValue = (value: number) => {
			if (copyWidth <= 0) return value;
			const offset = value - copyWidth;
			return copyWidth + (((offset % copyWidth) + copyWidth) % copyWidth);
		};

		const measure = () => {
			const width = copy.offsetWidth;
			if (width === copyWidth) return;
			copyWidth = width;
			position = copyWidth;
			viewport.scrollLeft = position;
			lastWritten = viewport.scrollLeft;
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
			lastTime = now;

			// While a finger is down the position belongs to the browser. A mouse
			// drag moves scrollLeft by deltas, so wrapping through it is invisible.
			if (isDragging) {
				if (!isTouchDrag) {
					const wrapped = wrapValue(viewport.scrollLeft);
					if (Math.abs(wrapped - viewport.scrollLeft) > 0.5) viewport.scrollLeft = wrapped;
				}
				position = viewport.scrollLeft;
				lastWritten = position;
				return;
			}

			// Momentum from the last swipe is still running
			if (now < settleUntil) {
				position = viewport.scrollLeft;
				lastWritten = position;
				return;
			}

			// Trackpad, keyboard or a clamp moved the strip behind our back
			if (Math.abs(viewport.scrollLeft - lastWritten) > EXTERNAL_SCROLL_THRESHOLD_PX) {
				position = viewport.scrollLeft;
			}

			if (!reduceMotion.matches) {
				position += (reverse ? -speed : speed) * delta;
			}

			position = wrapValue(position);
			viewport.scrollLeft = position;
			lastWritten = viewport.scrollLeft;
		};

		const start = () => {
			if (frame) return;
			lastTime = 0;
			frame = requestAnimationFrame(tick);
		};

		const stop = () => {
			if (!frame) return;
			cancelAnimationFrame(frame);
			frame = 0;
		};

		const handlePointerDown = (event: PointerEvent) => {
			isDragging = true;
			isTouchDrag = event.pointerType !== "mouse";
			lastPointerX = event.clientX;
			if (!isTouchDrag) {
				// Stops the drag from turning into a text/image selection
				event.preventDefault();
				viewport.setPointerCapture(event.pointerId);
			}
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (!isDragging || isTouchDrag) return;
			viewport.scrollLeft -= event.clientX - lastPointerX;
			lastPointerX = event.clientX;
		};

		const handlePointerUp = () => {
			if (!isDragging) return;
			if (isTouchDrag) settleUntil = performance.now() + TOUCH_SETTLE_MS;
			isDragging = false;
		};

		viewport.addEventListener("pointerdown", handlePointerDown);
		viewport.addEventListener("pointermove", handlePointerMove);
		viewport.addEventListener("pointerup", handlePointerUp);
		viewport.addEventListener("pointercancel", handlePointerUp);
		// Safety net: a pointer released outside the element must not leave the
		// strip stuck in a drag forever
		window.addEventListener("pointerup", handlePointerUp);
		window.addEventListener("pointercancel", handlePointerUp);

		const resizeObserver = new ResizeObserver(measure);
		resizeObserver.observe(copy);

		// Nothing to animate while the strip is off screen
		const visibilityObserver = new IntersectionObserver(
			(entries) => (entries[0].isIntersecting ? start() : stop()),
			{ rootMargin: "200px 0px" }
		);
		visibilityObserver.observe(viewport);

		return () => {
			stop();
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			viewport.removeEventListener("pointerdown", handlePointerDown);
			viewport.removeEventListener("pointermove", handlePointerMove);
			viewport.removeEventListener("pointerup", handlePointerUp);
			viewport.removeEventListener("pointercancel", handlePointerUp);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", handlePointerUp);
		};
	}, [reverse, speed]);

	return (
		<div
			ref={viewportRef}
			className={`marquee-track marquee-mask no-scrollbar overflow-x-auto overscroll-x-contain select-none cursor-grab active:cursor-grabbing ${className}`}
		>
			<div className="flex w-max">
				{COPIES.map((index) => (
					<div key={index} ref={index === 0 ? copyRef : undefined} className="flex">
						{children}
					</div>
				))}
			</div>
		</div>
	);
}
