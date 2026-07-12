import { projects } from "@/data/projects";
import LinkButton from "../LinkButton";
import { featuredProjectsContent } from "@/constants/home";

export default function FeaturedProjectsSection() {
	const featuredProjects = projects.filter((project) => project.featured);

	return (
		<section className="flex flex-col items-center gap-10 p-10 md:p-16">
			<h2 className="text-3xl">
				{featuredProjectsContent.headingPrefix}{" "}
				<span className="text-teal-300">{featuredProjectsContent.headingHighlight}</span>
			</h2>
			<div className="flex justify-center gap-10 flex-wrap">
				{featuredProjects.map((project) => (
					<div
						key={project.slug}
						className="w-64 h-40 border-2 border-white/20 rounded-2xl flex flex-col justify-center items-center gap-2 flex-shrink-0 hover:border-teal-300 hover:-translate-y-1 transition-all duration-300"
					>
						<p className="text-lg">{project.title}</p>
						<p className="text-sm text-teal-300">{project.tech}</p>
					</div>
				))}
			</div>
			<LinkButton href="/project">{featuredProjectsContent.ctaLabel}</LinkButton>
		</section>
	);
}
