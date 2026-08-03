import Link from "next/link";
import { siteConfig } from "@/constants/site";

type LogoProps = Readonly<{
	className?: string;
}>;

/**
 * Header/footer mark: the same teal initials as the generated favicon, set in
 * an outlined tile so the browser tab and the site read as one identity.
 */
export default function Logo({ className = "" }: LogoProps) {
	return (
		<Link
			href="/"
			aria-label={`${siteConfig.name} — home`}
			className={`group flex items-center gap-2.5 ${className}`}
		>
			<span
				className="flex items-center justify-center w-9 h-9 rounded-xl border-2 border-accent/70 bg-accent/10 text-accent text-[13px] font-bold tracking-tight group-hover:border-accent group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300"
				aria-hidden="true"
			>
				{siteConfig.initials}
			</span>
			<span className="text-lg font-semibold tracking-tight">{siteConfig.shortName}</span>
		</Link>
	);
}
