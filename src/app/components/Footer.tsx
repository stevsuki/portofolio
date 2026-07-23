import Link from "next/link";
import SocialIcon from "./SocialIcon";
import { siteConfig } from "@/constants/site";
import { navItems } from "@/constants/nav";

export default function Footer() {
	return (
		<footer className="border-t border-slate-900/10 dark:border-white/10 mt-10">
			<div className="max-w-5xl mx-auto flex flex-col items-center gap-6 py-10 px-10 md:flex-row md:justify-between">
				<Link href="/" className="text-teal-600 dark:text-teal-300 text-xl">
					{siteConfig.shortName}
				</Link>

				<ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-gray-400">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link href={item.href} className="hover:text-teal-600 dark:hover:text-teal-300 transition-colors">
								{item.label}
							</Link>
						</li>
					))}
				</ul>

				<SocialIcon />
			</div>
			<p className="text-sm text-slate-500 dark:text-gray-500 text-center pb-8">
				&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
			</p>
		</footer>
	);
}
