"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarScrollEffect from "./NavbarScrollEffect";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ThemeToggle";
import { siteConfig } from "@/constants/site";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<NavbarScrollEffect forceSolid={isMenuOpen}>
			<header className="transition-all duration-300">
				<nav className="w-screen h-20 flex justify-around items-center">
					<Link href="/" className="text-teal-600 dark:text-teal-300 text-2xl">
						{siteConfig.shortName}
					</Link>

					<NavLinks />

					<div className="flex items-center gap-4">
						<ThemeToggle />
						<MobileMenu isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
					</div>
				</nav>
			</header>
		</NavbarScrollEffect>
	);
}
