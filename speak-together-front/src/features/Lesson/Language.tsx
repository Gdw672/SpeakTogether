export const Language = {
    English: 0,
    German: 1,
    French: 2,
} as const;

export type Language = typeof Language[keyof typeof Language];

export const LanguageLabel: Record<Language, string> = {
    [Language.English]: "English",
    [Language.German]: "German",
    [Language.French]: "French",
};  