import type { Metadata } from "next";
import Image from "next/image";
import { FiBookOpen } from "react-icons/fi";
import LinkButton from "../components/LinkButton";
import ExperienceTimeline from "../components/ExperienceTimeline";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { aboutPageContent } from "@/constants/pages";
import { experienceContent } from "@/constants/home";

export const metadata: Metadata = {
	title: "About",
};

export default function About() {
	return (
		<main className="pt-28 p-10 md:p-16 md:pt-32 flex flex-col items-center gap-16">
			<section className="md:flex md:justify-center md:items-center md:gap-16 max-w-5xl">
				<div className="relative w-full h-[300px] md:w-[350px] md:h-[450px] flex-shrink-0 mb-10 md:mb-0 animate-fade-up">
					<Image
						src="/assets/person.webp"
						alt="Steven Suki"
						fill
						sizes="(max-width: 768px) calc(100vw - 5rem), 350px"
						className="object-contain"
						priority
						fetchPriority="high"
					/>
				</div>
				<div className="flex flex-col gap-6 items-center md:items-start text-center md:text-start animate-fade-up-delayed">
					<span className="text-xs tracking-[0.2em] uppercase text-teal-600/80 dark:text-teal-300/80 font-medium">
						{aboutPageContent.eyebrow}
					</span>
					<h1 className="text-4xl">
						{aboutPageContent.headingPrefix}{" "}
						<span className="text-teal-600 dark:text-teal-300">{aboutPageContent.headingHighlight}</span>
					</h1>
					{aboutPageContent.paragraphs.map((paragraph) => (
						<p key={paragraph} className="text-lg text-justify text-slate-600 dark:text-gray-300">
							{paragraph}
						</p>
					))}
					<div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
						<LinkButton href="/project">{aboutPageContent.ctaLabel}</LinkButton>
						<LinkButton
							href="/Steven_Suki_CV.pdf"
							download
							className="!border-teal-600 !text-teal-600 dark:!border-teal-300 dark:!text-teal-300"
						>
							{aboutPageContent.downloadCvLabel}
						</LinkButton>
					</div>
				</div>
			</section>

			<Reveal className="w-full">
				<section className="flex flex-col items-center gap-10 w-full">
					<SectionHeading
						eyebrow={experienceContent.eyebrow}
						prefix={experienceContent.headingPrefix}
						highlight={experienceContent.headingHighlight}
					/>
					<ExperienceTimeline />
				</section>
			</Reveal>

			<Reveal className="w-full">
				<section className="flex flex-col items-center gap-10 w-full">
					<SectionHeading
						eyebrow={aboutPageContent.education.eyebrow}
						prefix={aboutPageContent.education.headingPrefix}
						highlight={aboutPageContent.education.headingHighlight}
					/>
					<div className="flex items-start gap-4 w-full max-w-2xl p-5 border-2 border-slate-900/10 dark:border-white/10 rounded-2xl bg-[#f5f6f8] dark:bg-white/[2%] shadow-sm">
						<span className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full bg-teal-600/10 dark:bg-teal-300/10">
							<FiBookOpen className="text-teal-600 dark:text-teal-300" size={20} aria-hidden="true" />
						</span>
						<div className="flex flex-col gap-1">
							<div className="flex items-center justify-between gap-3 flex-wrap">
								<h3 className="text-lg font-semibold text-slate-900 dark:text-white">
									{aboutPageContent.education.school}
								</h3>
								<p className="text-xs text-slate-500 dark:text-gray-500">{aboutPageContent.education.period}</p>
							</div>
							<p className="text-base text-slate-600 dark:text-gray-300">{aboutPageContent.education.degree}</p>
							<p className="text-sm text-teal-600 dark:text-teal-300">{aboutPageContent.education.detail}</p>
						</div>
					</div>
				</section>
			</Reveal>
		</main>
	);
}
