import Image from "next/image";
import LinkButton from "../LinkButton";
import SocialIcon from "../SocialIcon";
import { siteConfig } from "@/constants/site";
import { heroContent } from "@/constants/home";

export default function MainSection() {
	return (
		<section className="relative justify-center items-center p-10 md:p-16 md:flex md:justify-evenly overflow-hidden">
			<div className="absolute inset-0 bg-grid" aria-hidden="true" />
			<div className="glow glow-teal w-[420px] h-[420px] -top-32 -left-32" />
			<div className="glow glow-blue w-[360px] h-[360px] top-20 -right-24" />

			<div className="relative z-10 flex w-full h-[300px] justify-center items-center md:w-[400px] md:h-[600px] mb-10 animate-fade-up">
				<Image
					src="/assets/person.webp"
					alt="main-image"
					fill
					sizes="(max-width: 768px) calc(100vw - 5rem), 400px"
					className="object-contain"
					priority
					fetchPriority="high"
				/>
			</div>
			<div className="relative z-10 flex flex-col md:w-[50%] items-center text-center md:text-start md:items-start animate-fade-up-delayed">
				<span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border border-teal-300/40 rounded-full text-sm text-teal-300 bg-teal-300/5">
					<span className="relative flex w-2 h-2">
						<span className="absolute inline-flex w-full h-full rounded-full bg-teal-300 opacity-75 animate-ping" />
						<span className="relative inline-flex w-2 h-2 rounded-full bg-teal-300" />
					</span>
					{heroContent.availability}
				</span>
				<h1 className="text-5xl">
					{heroContent.greeting} <span className="text-teal-300">{siteConfig.name}</span>
				</h1>
				<br />
				<h2 className="text-3xl">
					<span className="text-teal-300">{siteConfig.role}</span>
				</h2>
				<br />
				<p className="text-lg text-justify">{heroContent.bio}</p>
				<br />
				<SocialIcon />
				<br />
				<div className="flex flex-wrap gap-4">
					<LinkButton href="/contact">{heroContent.ctaLabel}</LinkButton>
					<LinkButton href="/project" className="border-white/30">
						{heroContent.secondaryCtaLabel}
					</LinkButton>
				</div>
			</div>
		</section>
	);
}
