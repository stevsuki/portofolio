"use client";

import { useEffect, useRef, useState } from "react";
import { FiDroplet } from "react-icons/fi";
import SwatchRow from "./SwatchRow";
import { accentSetting } from "@/data/accents";
import { backgroundSetting } from "@/data/backgrounds";

/**
 * The navbar entry point for the two colour axes. It collapses to a popover
 * rather than sitting inline because nine dots beside the search, theme and
 * menu buttons is more than the header can hold — below `sm` the whole control
 * is hidden and the mobile menu carries the rows instead.
 */
export default function AppearancePicker() {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	// Escape and a click anywhere outside both close the panel, and focus goes
	// back to the button that opened it — a popover that drops focus at the top
	// of the document is a dead end for a keyboard visitor.
	useEffect(() => {
		if (!isOpen) return;

		const toggle = toggleRef.current;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		const handlePointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("pointerdown", handlePointerDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("pointerdown", handlePointerDown);
			toggle?.focus();
		};
	}, [isOpen]);

	return (
		<div ref={containerRef} className="relative hidden sm:block">
			<button
				ref={toggleRef}
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Change colours"
				aria-expanded={isOpen}
				className={`group relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full border bg-surface transition-colors duration-300 ${
					isOpen ? "border-accent/60 text-accent" : "border-line text-muted hover:text-accent hover:border-accent/60"
				}`}
			>
				<span
					className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-300"
					aria-hidden="true"
				/>
				<FiDroplet size={17} aria-hidden="true" className="relative" />
			</button>

			{isOpen && (
				<div className="absolute right-0 top-12 z-50 flex flex-col gap-4 p-4 rounded-2xl border border-line bg-[var(--surface-overlay)] backdrop-blur-xl shadow-[var(--shadow-lift)] animate-menu-in">
					<div className="flex flex-col gap-2.5">
						<span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted whitespace-nowrap">
							Accent
						</span>
						<SwatchRow setting={accentSetting} swatchPrefix="swatch" legend="Accent colour" />
					</div>

					<div className="flex flex-col gap-2.5 pt-4 border-t border-line">
						<span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted whitespace-nowrap">
							Background
						</span>
						<SwatchRow
							setting={backgroundSetting}
							swatchPrefix="swatch-bg"
							legend="Background tone"
							strongBorder
						/>
					</div>
				</div>
			)}
		</div>
	);
}
