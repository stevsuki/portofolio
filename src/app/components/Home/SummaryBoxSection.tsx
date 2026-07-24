import { stats } from "@/data/stats";
import Reveal from "../Reveal";
import AnimatedStatValue from "../AnimatedStatValue";

export default function SummaryBoxSection() {
	return (
		<section className="flex justify-center">
			<div className="flex flex-col sm:flex-row flex-wrap justify-center divide-y sm:divide-y-0 sm:divide-x divide-slate-900/10 dark:divide-white/10">
				{stats.map((stat, index) => (
					<Reveal key={stat.label} delayMs={index * 100} className="flex justify-center">
						<div className="flex flex-col items-center gap-2 px-12 py-6">
							<AnimatedStatValue
								value={stat.value}
								className="text-5xl font-semibold tabular-nums text-teal-600 dark:text-teal-300"
							/>
							<span className="w-8 h-[3px] rounded-full bg-teal-600/50 dark:bg-teal-300/50" aria-hidden="true" />
							<p className="text-sm text-center uppercase tracking-wide text-slate-500 dark:text-gray-400 max-w-[140px]">
								{stat.label}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}
