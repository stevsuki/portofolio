"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/nav";

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<ul className="hidden justify-between items-center text-lg md:flex lg:w-[25%] md:w-[35%]">
			{navItems.map((item) => {
				const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
				return (
					<li
						key={item.href}
						className={`border-b-2 transition h-7 ${
							isActive ? "border-teal-300 text-teal-300" : "border-transparent hover:border-teal-300"
						}`}
					>
						<Link href={item.href} aria-current={isActive ? "page" : undefined}>
							{item.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
