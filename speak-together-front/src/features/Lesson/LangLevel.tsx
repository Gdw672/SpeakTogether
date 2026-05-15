export const LangLevel = {
    Beginner: 0,
    Elementary: 1,
    Intermediate: 2,
    Upper_Intermediate: 3,
    Advanced: 4,
    Proficient: 5,
} as const;

export type LangLevel = typeof LangLevel[keyof typeof LangLevel];

export const LangLevelLabel: Record<LangLevel, string> = {
    [LangLevel.Beginner]: "Beginner",
    [LangLevel.Elementary]: "Elementary",
    [LangLevel.Intermediate]: "Intermediate",
    [LangLevel.Upper_Intermediate]: "Upper Intermediate",
    [LangLevel.Advanced]: "Advanced",
    [LangLevel.Proficient]: "Proficient",
};