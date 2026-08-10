"use client";

import { useState } from "react";
import NavbarScrollEffect from "./NavbarScrollEffect";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ThemeToggle";
import AccentPicker from "../AccentPicker";
import CommandPaletteTrigger from "../CommandPaletteTrigger";
import Logo from "../Logo";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<NavbarScrollEffect forceSolid={isMenuOpen}>
			<header>
				<nav className="max-w-6xl mx-auto h-18 md:h-20 px-5 sm:px-8 flex justify-between items-center gap-4">
					<Logo />

					<NavLinks />

					<div className="flex items-center gap-2">
						<CommandPaletteTrigger />
						<AccentPicker />
						<ThemeToggle />
						<MobileMenu isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
					</div>
				</nav>
			</header>
		</NavbarScrollEffect>
	);
}
