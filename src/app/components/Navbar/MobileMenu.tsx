"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { navItems } from "@/constants/nav";

type MobileMenuProps = Readonly<{
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}>;

export default function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
	const pathname = usePathname();

	// Escape closes the panel; scroll is locked so the page behind the overlay
	// stays put while the menu is open.
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onOpenChange(false);
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onOpenChange]);

	return (
		<div className="md:hidden">
			<button
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
					<ul className="absolute left-0 right-0 top-18 flex flex-col gap-1 p-4 bg-[var(--background)]/95 backdrop-blur-xl border-b border-line shadow-2xl animate-menu-in">
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
				</>
			)}
		</div>
	);
}
