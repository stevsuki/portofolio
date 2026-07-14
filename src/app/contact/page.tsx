import type { Metadata } from "next";
import { FiMail } from "react-icons/fi";
import SocialIcon from "../components/SocialIcon";
import { siteConfig } from "@/constants/site";
import { contactPageContent } from "@/constants/pages";

export const metadata: Metadata = {
	title: "Contact",
};

export default function Contact() {
	return (
		<main className="relative pt-28 p-10 md:p-16 md:pt-32 flex flex-col items-center gap-10 min-h-[70vh] justify-center animate-fade-up overflow-hidden">
			<div className="glow glow-teal w-[320px] h-[320px] top-0 left-1/2 -translate-x-1/2" />

			<div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-xl">
				<span className="text-xs tracking-[0.2em] uppercase text-teal-300/80 font-medium">
					{contactPageContent.eyebrow}
				</span>
				<h1 className="text-4xl">
					{contactPageContent.headingPrefix}{" "}
					<span className="text-teal-300">{contactPageContent.headingHighlight}</span>
				</h1>
				<p className="text-lg text-gray-300">{contactPageContent.description}</p>
			</div>

			<a
				href={`mailto:${siteConfig.email}`}
				className="relative z-10 flex items-center gap-3 px-8 py-3 border-2 rounded-4xl hover:bg-teal-300/30 hover:border-teal-300 transition-colors duration-300"
			>
				<FiMail size={20} aria-hidden="true" className="text-teal-300" />
				{contactPageContent.emailCtaLabel}
			</a>

			<div className="relative z-10 flex flex-col items-center gap-4">
				<p className="text-sm text-gray-400">{contactPageContent.socialsLabel}</p>
				<SocialIcon />
			</div>
		</main>
	);
}
