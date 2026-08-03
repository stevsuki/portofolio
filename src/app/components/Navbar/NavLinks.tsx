"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/nav";

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<ul className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-line bg-surface backdrop-blur-md">
			{navItems.map((item) => {
				const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
				return (
					<li key={item.href}>
						<Link
							href={item.href}
							aria-current={isActive ? "page" : undefined}
							className={`relative block px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
								isActive ? "text-accent" : "text-muted hover:text-ink"
							}`}
						>
							{isActive && (
								<span
									className="absolute inset-0 rounded-full bg-accent/12 border border-accent/25"
									aria-hidden="true"
								/>
							)}
							<span className="relative">{item.label}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
