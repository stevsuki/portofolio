import { techStacks } from "@/data/techStack";
import { techStackContent } from "@/constants/home";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function TechStackSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-10 md:p-16">
			<Reveal>
				<SectionHeading
					eyebrow={techStackContent.eyebrow}
					prefix={techStackContent.headingPrefix}
					highlight={techStackContent.headingHighlight}
				/>
			</Reveal>
			<div className="flex justify-center gap-4 flex-wrap max-w-3xl">
				{techStacks.map((tech, index) => (
					<Reveal key={tech.name} delayMs={index * 60}>
						<div className="flex flex-col items-center gap-2 w-24 py-4 border-2 border-white/10 rounded-2xl bg-white/[2%] hover:border-teal-300 hover:bg-teal-300/5 hover:-translate-y-1 transition-all duration-300">
							<tech.icon size={40} color={tech.color} aria-hidden="true" />
							<p className="text-sm text-center text-gray-300">{tech.name}</p>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}
