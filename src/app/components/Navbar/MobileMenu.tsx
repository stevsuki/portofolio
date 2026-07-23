"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "@/constants/nav";

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<div className="md:hidden">
			<button
				type="button"
				onClick={() => setIsOpen((open) => !open)}
				aria-label={isOpen ? "Close menu" : "Open menu"}
				aria-expanded={isOpen}
				className="flex items-center justify-center w-10 h-10 text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
			>
				{isOpen ? <FiX size={26} aria-hidden="true" /> : <FiMenu size={26} aria-hidden="true" />}
			</button>

			{isOpen && (
				<ul className="absolute left-0 right-0 top-20 flex flex-col items-center gap-2 py-4 bg-[#edf0f4]/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-900/10 dark:border-white/10 animate-menu-in">
					{navItems.map((item) => {
						const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
						return (
							<li key={item.href} className="w-full text-center">
								<Link
									href={item.href}
									onClick={() => setIsOpen(false)}
									aria-current={isActive ? "page" : undefined}
									className={`block py-2 text-lg transition-colors ${
										isActive
											? "text-teal-600 dark:text-teal-300"
											: "hover:text-teal-600 dark:hover:text-teal-300"
									}`}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
