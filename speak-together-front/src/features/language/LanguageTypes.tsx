export interface UserLanguageDto {
    language: number;
    level: number;
}

export interface UserLanguagePreferenceDto {
    language: number;   
    minLevel: number;
    maxLevel: number;
}