export const Language = {
    English: 0,
    German: 1,
    French: 2,
} as const;

export type Language = typeof Language[keyof typeof Language];