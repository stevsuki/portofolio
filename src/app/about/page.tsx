import type { Metadata } from "next";
import Image from "next/image";
import { FiBookOpen, FiDownload } from "react-icons/fi";
import LinkButton from "../components/LinkButton";
import ExperienceTimeline from "../components/ExperienceTimeline";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { aboutPageContent } from "@/constants/pages";
import { experienceContent } from "@/constants/home";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
	title: "About",
};

export default function About() {
	return (
		<main>
			<section className="relative px-5 sm:px-8 pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
				<div className="bg-grid" aria-hidden="true" />
				<div className="glow glow-teal glow-drift w-[460px] h-[460px] -top-32 -left-24" aria-hidden="true" />
				<div className="glow glow-blue glow-drift-slow w-[380px] h-[380px] top-10 -right-24" aria-hidden="true" />

				<div className="relative z-10 grid md:grid-cols-12 items-center gap-10 lg:gap-16 max-w-5xl mx-auto">
					<div className="md:col-span-5 flex justify-center animate-fade-up">
						<div className="relative w-full max-w-[300px] h-[300px] md:h-[420px]">
							<div className="avatar-ring" aria-hidden="true" />
							<div className="avatar-backdrop" aria-hidden="true" />
							<Image
								src="/assets/person.webp"
								alt={siteConfig.name}
								fill
								sizes="(max-width: 768px) 300px, 340px"
								className="relative object-contain"
								priority
								fetchPriority="high"
							/>
						</div>
					</div>

					<div className="md:col-span-7 flex flex-col gap-6 items-center md:items-start text-center md:text-start animate-fade-up-delayed">
						<span className="eyebrow inline-flex items-center gap-2.5">
							<span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />
							{aboutPageContent.eyebrow}
						</span>
						<h1 className="text-4xl sm:text-5xl">
							{aboutPageContent.headingPrefix}{" "}
							<span className="gradient-text">{aboutPageContent.headingHighlight}</span>
						</h1>
						{aboutPageContent.paragraphs.map((paragraph) => (
							<p key={paragraph} className="text-base sm:text-lg leading-relaxed text-muted">
								{paragraph}
							</p>
						))}
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
							<LinkButton href="/project" variant="primary" withArrow>
								{aboutPageContent.ctaLabel}
							</LinkButton>
							<LinkButton
								href={siteConfig.cvUrl}
								download
								icon={<FiDownload size={16} aria-hidden="true" />}
							>
								{aboutPageContent.downloadCvLabel}
							</LinkButton>
						</div>
					</div>
				</div>
			</section>

			<Section
				decoration={
					<div className="glow glow-violet glow-drift w-[380px] h-[380px] top-20 -right-20" aria-hidden="true" />
				}
			>
				<Reveal>
					<SectionHeading
						eyebrow={experienceContent.eyebrow}
						prefix={experienceContent.headingPrefix}
						highlight={experienceContent.headingHighlight}
					/>
				</Reveal>
				<ExperienceTimeline />
			</Section>

			<Section
				className="!pt-0"
				decoration={
					<div className="glow glow-teal w-[340px] h-[340px] bottom-0 -left-20" aria-hidden="true" />
				}
			>
				<Reveal>
					<SectionHeading
						eyebrow={aboutPageContent.education.eyebrow}
						prefix={aboutPageContent.education.headingPrefix}
						highlight={aboutPageContent.education.headingHighlight}
					/>
				</Reveal>

				<Reveal variant="blur" className="w-full max-w-3xl">
					<div className="card card-sheen card-hover flex items-start gap-5 p-6">
						<span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
							<FiBookOpen size={20} aria-hidden="true" />
						</span>
						<div className="flex flex-col gap-1.5">
							<div className="flex items-center justify-between gap-3 flex-wrap">
								<h3 className="text-lg font-semibold">{aboutPageContent.education.school}</h3>
								<p className="font-mono text-xs text-muted">{aboutPageContent.education.period}</p>
							</div>
							<p className="text-base text-muted">{aboutPageContent.education.degree}</p>
							<span className="chip w-fit mt-1">{aboutPageContent.education.detail}</span>
						</div>
					</div>
				</Reveal>
			</Section>
		</main>
	);
}
