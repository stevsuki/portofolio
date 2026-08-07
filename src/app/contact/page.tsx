import type { Metadata } from "next";
import { FiMail } from "react-icons/fi";
import SocialIcon from "../components/SocialIcon";
import PageIntro from "../components/PageIntro";
import CopyButton from "../components/CopyButton";
import { siteConfig } from "@/constants/site";
import { contactPageContent } from "@/constants/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
	title: "Contact",
	description: contactPageContent.ogDescription,
	path: "/contact",
});

export default function Contact() {
	return (
		<main className="relative flex flex-col items-center justify-center gap-10 min-h-[calc(100svh-5rem)] px-5 sm:px-8 pt-32 pb-24 md:pt-36 overflow-hidden">
			<div className="bg-grid" aria-hidden="true" />
			<div
				className="glow glow-teal glow-drift w-[460px] h-[460px] -top-20 left-1/2 -translate-x-1/2"
				aria-hidden="true"
			/>
			<div className="glow glow-blue glow-drift-slow w-[340px] h-[340px] bottom-0 right-0" aria-hidden="true" />

			<div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-2xl">
				<PageIntro
					eyebrow={contactPageContent.eyebrow}
					headingPrefix={contactPageContent.headingPrefix}
					headingHighlight={contactPageContent.headingHighlight}
					description={contactPageContent.description}
				/>

				{/* The card is a container rather than one big link: copying the
				    address is a separate action, and a button cannot be nested in an
				    anchor. */}
				<div
					className="card card-sheen card-hover group flex flex-col sm:flex-row items-center gap-5 w-full p-6 sm:p-7 text-center sm:text-start animate-hero"
					style={{ "--delay": "240ms" } as React.CSSProperties}
				>
					<a
						href={`mailto:${siteConfig.email}`}
						className="relative z-10 flex flex-col sm:flex-row items-center gap-5 grow min-w-0"
					>
						<span className="flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 transition-transform duration-500">
							<FiMail size={22} aria-hidden="true" />
						</span>
						<span className="flex flex-col gap-1 min-w-0">
							<span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
								{contactPageContent.emailCtaLabel}
							</span>
							<span className="text-lg sm:text-xl font-medium break-all group-hover:text-accent transition-colors duration-300">
								{siteConfig.email}
							</span>
						</span>
					</a>

					<CopyButton
						value={siteConfig.email}
						subject="email address"
						withLabel
						className="relative z-10 px-4 py-2 rounded-full border border-line bg-surface hover:border-accent/50"
					/>
				</div>

				<div
					className="flex flex-col items-center gap-4 animate-hero"
					style={{ "--delay": "320ms" } as React.CSSProperties}
				>
					<span className="flex items-center gap-3 text-sm text-muted">
						<span className="w-8 h-px bg-line-strong" aria-hidden="true" />
						{contactPageContent.socialsLabel}
						<span className="w-8 h-px bg-line-strong" aria-hidden="true" />
					</span>
					<SocialIcon />
				</div>
			</div>
		</main>
	);
}
