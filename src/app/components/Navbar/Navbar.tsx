import Link from "next/link";
import NavbarScrollEffect from "./NavbarScrollEffect";
import { siteConfig } from "@/constants/site";
import { navItems } from "@/constants/nav";

export default function Navbar() {
	return (
		<NavbarScrollEffect>
			<header className="transition-all duration-300">
				<nav className="w-screen h-20 flex justify-around items-center">
					<h1 className="text-teal-300 text-2xl">{siteConfig.shortName}</h1>

					<ul className="hidden justify-between item-center text-lg md:flex lg:w-[25%] md:w-[35%]">
						{navItems.map((item) => (
							<li key={item.href} className="hover:border-b-2 hover:border-teal-300 transition h-7">
								<Link href={item.href}>{item.label}</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
		</NavbarScrollEffect>
	);
}
