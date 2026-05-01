import type { Material } from "./Material";
import type { Language } from "./Language"
import type { LangLevel } from "./LangLevel"

export type Lesson = {
    id: number;
    name: string;
    description: string;

    startDate: string;
    endDate: string;

    language: Language;
    langLevel: LangLevel;

    materials?: Material[];
};
