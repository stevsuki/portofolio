import { projects } from "@/data/projects";
import Link from "next/link";
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
						className="w-64 h-40 border-3 border-white rounded-2xl flex flex-col justify-center items-center gap-2 flex-shrink-0"
					>
						<p className="text-lg">{project.title}</p>
						<p className="text-sm text-teal-300">{project.tech}</p>
					</div>
				))}
			</div>
			<Link
				href="/project"
				className="w-45 p-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-teal-300/30 text-center"
			>
				{featuredProjectsContent.ctaLabel}
			</Link>
		</section>
	);
}
