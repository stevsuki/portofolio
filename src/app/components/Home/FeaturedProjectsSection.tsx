import { projects } from "@/data/projects";
import LinkButton from "../LinkButton";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";
import Reveal from "../Reveal";
import SpotlightGroup from "../SpotlightGroup";
import { featuredProjectsContent } from "@/constants/home";

export default function FeaturedProjectsSection() {
	const featuredProjects = projects.filter((project) => project.featured);

	return (
		<Section
			decoration={
				<div className="glow glow-blue glow-drift-slow w-[420px] h-[420px] top-0 -right-20" aria-hidden="true" />
			}
		>
			<Reveal>
				<SectionHeading
					eyebrow={featuredProjectsContent.eyebrow}
					prefix={featuredProjectsContent.headingPrefix}
					highlight={featuredProjectsContent.headingHighlight}
				/>
			</Reveal>

			<SpotlightGroup tilt className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
				{featuredProjects.map((project, index) => (
					<Reveal key={project.slug} delayMs={index * 90} variant="blur" className="h-full">
						<ProjectCard project={project} />
					</Reveal>
				))}
			</SpotlightGroup>

			<Reveal>
				<LinkButton href="/project" withArrow>
					{featuredProjectsContent.ctaLabel}
				</LinkButton>
			</Reveal>
		</Section>
	);
}
