import { techStacks } from "@/data/techStack";
import { techStackContent } from "@/constants/home";

export default function TechStackSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-10 md:p-16">
			<h2 className="text-3xl">
				{techStackContent.headingPrefix}{" "}
				<span className="text-teal-300">{techStackContent.headingHighlight}</span>
			</h2>
			<div className="flex justify-center gap-8 flex-wrap max-w-3xl">
				{techStacks.map((tech) => (
					<div
						key={tech.name}
						className="flex flex-col items-center gap-2 w-20 hover:-translate-y-1 transition-transform duration-300"
					>
						<tech.icon size={48} color={tech.color} aria-hidden="true" />
						<p className="text-sm text-center text-gray-300">{tech.name}</p>
					</div>
				))}
			</div>
		</section>
	);
}
