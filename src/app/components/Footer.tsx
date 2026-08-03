import Link from "next/link";
import { FiArrowUp, FiMail } from "react-icons/fi";
import SocialIcon from "./SocialIcon";
import Logo from "./Logo";
import { siteConfig } from "@/constants/site";
import { navItems } from "@/constants/nav";

export default function Footer() {
	return (
		<footer className="relative border-t border-line overflow-hidden">
			<div className="glow glow-teal w-[420px] h-[420px] -bottom-56 left-1/2 -translate-x-1/2" aria-hidden="true" />

			<div className="relative z-10 grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] max-w-6xl mx-auto px-5 sm:px-8 py-14">
				<div className="flex flex-col items-start gap-4">
					<Logo />
					<p className="max-w-xs text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
					<SocialIcon />
				</div>

				<nav aria-label="Footer">
					<p className="font-mono text-xs uppercase tracking-[0.14em] text-muted mb-4">Navigate</p>
					<ul className="flex flex-col gap-2.5">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="text-sm text-muted hover:text-accent transition-colors duration-300"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div>
					<p className="font-mono text-xs uppercase tracking-[0.14em] text-muted mb-4">Get in touch</p>
					<ul className="flex flex-col gap-2.5">
						<li>
							<a
								href={`mailto:${siteConfig.email}`}
								className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-300 break-all"
							>
								<FiMail size={14} aria-hidden="true" className="shrink-0" />
								{siteConfig.email}
							</a>
						</li>
						<li>
							<a
								href="/Steven_Suki_CV.pdf"
								download
								className="text-sm text-muted hover:text-accent transition-colors duration-300"
							>
								Download CV
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="relative z-10 border-t border-line">
				<div className="flex flex-col sm:flex-row justify-between items-center gap-3 max-w-6xl mx-auto px-5 sm:px-8 py-6 text-sm text-muted">
					<p>
						&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
					</p>
					<div className="flex items-center gap-5">
						<p className="font-mono text-xs">Next.js · Tailwind CSS</p>
						{/* Anchors to the marker in the root layout, so returning to the
						    top costs no JavaScript and inherits smooth scrolling */}
						<a
							href="#top"
							className="inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-300"
						>
							Back to top
							<FiArrowUp size={14} aria-hidden="true" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
