import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { projectPageContent } from "@/constants/pages";
import { pageMetadata } from "@/lib/metadata";
import PageIntro from "../components/PageIntro";
import ProjectGallery from "../components/ProjectGallery";

export const metadata: Metadata = pageMetadata({
	title: "Projects",
	description: projectPageContent.description,
	path: "/project",
});

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

				<ProjectGallery projects={projects} />
			</div>
		</main>
	);
}
