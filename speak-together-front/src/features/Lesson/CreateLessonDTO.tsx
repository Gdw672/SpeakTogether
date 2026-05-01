import type { LangLevel } from "./LangLevel";
import type { Language } from "./Language";

export type CreateLessonDTO = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    language: Language;
    langLevel: LangLevel;
    file?: File;
};