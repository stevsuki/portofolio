export type ExperiencePosition = {
	role: string;
	startDate: string;
	endDate: string;
	description: string;
};

export type Experience = {
	company: string;
	positions: ExperiencePosition[];
};
