import { experiences } from "@/data/experience";
import { experienceContent } from "@/constants/home";

export default function ExperienceSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-10 md:p-16">
			<h2 className="text-3xl">
				{experienceContent.headingPrefix}{" "}
				<span className="text-teal-300">{experienceContent.headingHighlight}</span>
			</h2>
			<div className="relative flex flex-col gap-10 max-w-2xl w-full">
				<div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-teal-300/40" />
				{experiences.map((experience) => (
					<div key={`${experience.company}-${experience.role}`} className="relative flex gap-6 pl-6">
						<span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-teal-300 border-2 border-slate-900" />
						<div className="flex flex-col gap-1">
							<p className="text-sm text-teal-300">
								{experience.startDate} - {experience.endDate}
							</p>
							<h3 className="text-xl">{experience.role}</h3>
							<p className="text-sm text-gray-400">{experience.company}</p>
							<p className="text-base text-justify mt-1">{experience.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
