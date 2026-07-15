import { experiences } from "@/data/experience";

export default function ExperienceTimeline() {
	return (
		<div className="relative flex flex-col gap-10 max-w-2xl w-full">
			<div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-teal-300/40" />
			{experiences.map((experience) => (
				<div key={experience.company} className="relative flex gap-6 pl-6">
					<span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-teal-300 border-2 border-slate-900 ring-4 ring-teal-300/15" />
					<div className="flex flex-col w-full p-5 border-2 border-white/10 rounded-2xl bg-white/[2%] hover:border-teal-300/50 transition-colors duration-300">
						<p className="text-sm text-gray-400">{experience.company}</p>
						<div className="flex flex-col mt-2">
							{experience.positions.map((position, index) => (
								<div
									key={`${position.role}-${position.startDate}`}
									className={
										index > 0
											? "flex flex-col gap-1 mt-4 pt-4 border-t border-white/10"
											: "flex flex-col gap-1"
									}
								>
									<p className="text-sm text-teal-300">
										{position.startDate} - {position.endDate}
									</p>
									<h3 className="text-xl">{position.role}</h3>
									<p className="text-base text-justify mt-1 text-gray-300">{position.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
