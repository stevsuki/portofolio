"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { navItems } from "@/constants/nav";
import SwatchRow from "../SwatchRow";
import { accentSetting } from "@/data/accents";
import { backgroundSetting } from "@/data/backgrounds";

type MobileMenuProps = Readonly<{
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}>;

/** Skips the backdrop, which is a button only so it can be clicked away */
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]):not([tabindex="-1"])';

export default function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
	const pathname = usePathname();
	const containerRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	// Escape closes the panel, scroll is locked so the page behind the overlay
	// stays put, and Tab is kept inside the menu — an open overlay that lets
	// focus wander onto the page underneath is unusable with a keyboard.
	useEffect(() => {
		if (!isOpen) return;

		// The toggle outlives the panel, so capturing it here is the same node the
		// cleanup wants to hand focus back to.
		const toggle = toggleRef.current;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onOpenChange(false);
				return;
			}

			if (event.key !== "Tab") return;

			const focusables = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
			if (!focusables?.length) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement;

			if (event.shiftKey && (active === first || !containerRef.current?.contains(active))) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
			// Closing hands focus back to the control that opened the menu instead
			// of dropping it at the top of the document
			toggle?.focus();
		};
	}, [isOpen, onOpenChange]);

	// Covers the routes a link click does not: browser back/forward while the
	// panel is open would otherwise leave it hanging over the new page.
	useEffect(() => {
		onOpenChange(false);
	}, [pathname, onOpenChange]);

	return (
		<div ref={containerRef} className="md:hidden">
			<button
				ref={toggleRef}
				type="button"
				onClick={() => onOpenChange(!isOpen)}
				aria-label={isOpen ? "Close menu" : "Open menu"}
				aria-expanded={isOpen}
				className="relative flex items-center justify-center w-10 h-10 rounded-full border border-line bg-surface text-ink hover:text-accent hover:border-accent/60 transition-colors duration-300"
			>
				{isOpen ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
			</button>

			{isOpen && (
				<>
					<button
						type="button"
						tabIndex={-1}
						aria-hidden="true"
						onClick={() => onOpenChange(false)}
						className="fixed inset-0 top-18 -z-10 bg-[var(--background)]/60 backdrop-blur-sm cursor-default"
					/>
					<div className="absolute left-0 right-0 top-18 flex flex-col p-4 bg-[var(--background)]/95 backdrop-blur-xl border-b border-line shadow-2xl animate-menu-in">
						<ul className="flex flex-col gap-1">
							{navItems.map((item, index) => {
								const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
								return (
									<li
										key={item.href}
										className="animate-hero"
										style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}
									>
										<Link
											href={item.href}
											onClick={() => onOpenChange(false)}
											aria-current={isActive ? "page" : undefined}
											className={`flex items-center justify-between px-4 py-3 rounded-xl text-lg transition-colors duration-300 ${
												isActive
													? "bg-accent/10 text-accent border border-accent/25"
													: "text-muted border border-transparent hover:bg-surface hover:text-ink"
											}`}
										>
											{item.label}
											<FiArrowUpRight size={18} aria-hidden="true" className="opacity-60" />
										</Link>
									</li>
								);
							})}
						</ul>

						{/* The navbar's popover is hidden below `sm`, so the swatches live
						    here instead — inline, since the panel has the room a header row
						    does not */}
						<div
							className="animate-hero flex flex-col gap-3 mt-2 pt-4 px-4 pb-1 border-t border-line"
							style={{ "--delay": `${navItems.length * 45}ms` } as React.CSSProperties}
						>
							<div className="flex items-center justify-between gap-4">
								<span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
									Accent
								</span>
								<SwatchRow setting={accentSetting} swatchPrefix="swatch" legend="Accent colour" />
							</div>
							<div className="flex items-center justify-between gap-4">
								<span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
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
					</div>
				</>
			)}
		</div>
	);
}
