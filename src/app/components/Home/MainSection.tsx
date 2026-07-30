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
				<svg width="0" height="0" className="absolute" aria-hidden="true">
					<filter id="avatar-feather" x="-10%" y="-10%" width="120%" height="120%">
						<feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="blurredAlpha" />
						<feComponentTransfer in="blurredAlpha" result="smoothAlpha">
							<feFuncA type="linear" slope="3.5" intercept="0" />
						</feComponentTransfer>
						<feComposite in="SourceGraphic" in2="smoothAlpha" operator="in" />
					</filter>
				</svg>
				<div className="avatar-backdrop" aria-hidden="true" />
				<Image
					src="/assets/person.webp"
					alt="main-image"
					fill
					sizes="(max-width: 768px) calc(100vw - 5rem), 400px"
					className="object-contain avatar-image"
					priority
					fetchPriority="high"
				/>
			</div>
			<div className="relative z-10 flex flex-col md:w-[50%] items-center text-center md:text-start md:items-start animate-fade-up-delayed">
				{heroContent.isOpenToWork ? (
					<span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border border-teal-600/40 dark:border-teal-300/40 rounded-full text-sm text-teal-600 dark:text-teal-300 bg-teal-600/5 dark:bg-teal-300/5">
						<span className="relative flex w-2 h-2">
							<span className="absolute inline-flex w-full h-full rounded-full bg-teal-600 dark:bg-teal-300 opacity-75 animate-ping" />
							<span className="relative inline-flex w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-300" />
						</span>
						{heroContent.availability}
					</span>
				) : (
					<span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border border-slate-400/40 dark:border-gray-500/40 rounded-full text-sm text-slate-500 dark:text-gray-400 bg-slate-500/5 dark:bg-gray-500/5">
						<span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-gray-500" />
						{heroContent.unavailability}
					</span>
				)}
				<h1 className="text-5xl">
					{heroContent.greeting} <span className="text-teal-600 dark:text-teal-300">{siteConfig.name}</span>
				</h1>
				<br />
				<h2 className="text-3xl">
					<span className="text-teal-600 dark:text-teal-300">{siteConfig.role}</span>
				</h2>
				<br />
				<p className="text-lg text-justify">{heroContent.bio}</p>
				<br />
				<SocialIcon />
				<br />
				<div className="flex flex-wrap justify-center md:justify-start gap-4">
					<LinkButton href="/contact">{heroContent.ctaLabel}</LinkButton>
					<LinkButton href="/project" className="border-slate-900/20 dark:border-white/30">
						{heroContent.secondaryCtaLabel}
					</LinkButton>
				</div>
			</div>
		</section>
	);
}
