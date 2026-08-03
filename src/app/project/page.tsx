import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { projectPageContent } from "@/constants/pages";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import PageIntro from "../components/PageIntro";
import SpotlightGroup from "../components/SpotlightGroup";

export const metadata: Metadata = {
	title: "Projects",
};

export default function Project() {
	return (
		<main className="relative px-5 sm:px-8 pt-32 pb-24 md:pt-40 overflow-hidden">
			<div className="bg-grid" aria-hidden="true" />
			<div className="glow glow-teal glow-drift w-[440px] h-[440px] -top-32 -left-24" aria-hidden="true" />
			<div className="glow glow-violet glow-drift-slow w-[380px] h-[380px] top-20 -right-24" aria-hidden="true" />

			<div className="relative z-10 flex flex-col items-center gap-14 max-w-6xl mx-auto">
				<PageIntro
					eyebrow={projectPageContent.eyebrow}
					headingPrefix={projectPageContent.headingPrefix}
					headingHighlight={projectPageContent.headingHighlight}
					description={projectPageContent.description}
				/>

				<SpotlightGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
					{projects.map((project, index) => (
						<Reveal key={project.slug} delayMs={index * 90} variant="blur" className="h-full">
							<ProjectCard project={project} />
						</Reveal>
					))}
				</SpotlightGroup>
			</div>
		</main>
	);
}
