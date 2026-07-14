import Link from "next/link";
import NavbarScrollEffect from "./NavbarScrollEffect";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { siteConfig } from "@/constants/site";

export default function Navbar() {
	return (
		<NavbarScrollEffect>
			<header className="transition-all duration-300">
				<nav className="w-screen h-20 flex justify-around items-center">
					<Link href="/" className="text-teal-300 text-2xl">
						{siteConfig.shortName}
					</Link>

					<NavLinks />

					<MobileMenu />
				</nav>
			</header>
		</NavbarScrollEffect>
	);
}
