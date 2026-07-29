export type ExperiencePosition = {
	role: string;
	startDate: string;
	endDate: string;
	highlights: string[];
};

export type Experience = {
	company: string;
	positions: ExperiencePosition[];
};
