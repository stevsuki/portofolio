import { projects } from "@/data/projects";
import LinkButton from "../LinkButton";
import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";
import Reveal from "../Reveal";
import { featuredProjectsContent } from "@/constants/home";

export default function FeaturedProjectsSection() {
	const featuredProjects = projects.filter((project) => project.featured);

	return (
		<section className="relative flex flex-col items-center gap-10 p-10 md:p-16">
			<div className="glow glow-blue w-[300px] h-[300px] top-0 right-0" />
			<div className="relative z-10 flex flex-col items-center gap-10 w-full">
				<SectionHeading
					eyebrow={featuredProjectsContent.eyebrow}
					prefix={featuredProjectsContent.headingPrefix}
					highlight={featuredProjectsContent.headingHighlight}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
					{featuredProjects.map((project, index) => (
						<Reveal key={project.slug} delayMs={index * 80} className="h-full">
							<ProjectCard project={project} />
						</Reveal>
					))}
				</div>
				<LinkButton href="/project">{featuredProjectsContent.ctaLabel}</LinkButton>
			</div>
		</section>
	);
}
