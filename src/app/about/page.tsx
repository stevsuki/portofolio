import type { Metadata } from "next";
import Image from "next/image";
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
					<span className="text-xs tracking-[0.2em] uppercase text-teal-300/80 font-medium">
						{aboutPageContent.eyebrow}
					</span>
					<h1 className="text-4xl">
						{aboutPageContent.headingPrefix}{" "}
						<span className="text-teal-300">{aboutPageContent.headingHighlight}</span>
					</h1>
					{aboutPageContent.paragraphs.map((paragraph) => (
						<p key={paragraph} className="text-lg text-justify text-gray-300">
							{paragraph}
						</p>
					))}
					<LinkButton href="/project">{aboutPageContent.ctaLabel}</LinkButton>
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
		</main>
	);
}
