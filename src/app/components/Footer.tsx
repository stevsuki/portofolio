import SocialIcon from "./SocialIcon";
import { siteConfig } from "@/constants/site";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center gap-4 py-10 mt-10 border-t border-white/10">
			<h2 className="text-teal-300 text-xl">{siteConfig.shortName}</h2>
			<SocialIcon />
			<p className="text-sm text-gray-400">
				&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
			</p>
		</footer>
	);
}
