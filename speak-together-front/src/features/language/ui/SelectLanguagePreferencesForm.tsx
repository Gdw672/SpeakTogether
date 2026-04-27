import { useState } from "react";
import { choosePreferences } from "../api/LanguageApi";
import type { UserLanguagePreferenceDto } from "../LanguageTypes";
import { getJwt } from "../../auth/api/AuthHelper";

const LANGUAGES = [
    { name: "English", flag: "🇬🇧" },
    { name: "German", flag: "🇩🇪" },
    { name: "French", flag: "🇫🇷" },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LANGUAGE_MAP: Record<string, number> = {
    English: 0,
    German: 1,
    French: 2,
};

const LEVEL_MAP: Record<string, number> = {
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
};

type SelectedLanguage = {
    name: string;
    minLevel: string;
    maxLevel: string;
};

export const SelectLanguagePreferenceForm = () => {
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguage[]>([]);

    const handleAddLanguage = (lang: string) => {
        if (!lang) return;

        if (selectedLanguages.find((l) => l.name === lang)) return;

        setSelectedLanguages([
            ...selectedLanguages,
            { name: lang, minLevel: "A1", maxLevel: "B1" },
        ]);
    };

    const handleMinLevelChange = (index: number, level: string) => {
        const updated = [...selectedLanguages];
        updated[index].minLevel = level;
        setSelectedLanguages(updated);
    };

    const handleMaxLevelChange = (index: number, level: string) => {
        const updated = [...selectedLanguages];
        updated[index].maxLevel = level;
        setSelectedLanguages(updated);
    };

    const handleRemove = (index: number) => {
        const updated = selectedLanguages.filter((_, i) => i !== index);
        setSelectedLanguages(updated);
    };

    const handleSubmit = async () => {
        const payload: UserLanguagePreferenceDto[] = selectedLanguages.map((l) => ({
            language: LANGUAGE_MAP[l.name],
            minLevel: LEVEL_MAP[l.minLevel],
            maxLevel: LEVEL_MAP[l.maxLevel],
        }));

        console.log("🚀 Payload:", payload);

        const token = getJwt();
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await choosePreferences(payload, token);
            console.log("Saved");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 500 }}>
            <h2 style={styles.title}>
                Select your preferred language learning range
            </h2>

            <select onChange={(e) => handleAddLanguage(e.target.value)}>
                <option value="">Select language</option>
                {LANGUAGES.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>

            <div style={{ marginTop: 20 }}>
                {selectedLanguages.map((lang, index) => (
                    <div
                        key={lang.name}
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            marginBottom: 12,
                        }}
                    >
                        <span style={{ width: 100 }}>{lang.name}</span>

                        { }
                        <select
                            value={lang.minLevel}
                            onChange={(e) =>
                                handleMinLevelChange(index, e.target.value)
                            }
                        >
                            {LEVELS.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    Min: {lvl}
                                </option>
                            ))}
                        </select>

                        { }
                        <select
                            value={lang.maxLevel}
                            onChange={(e) =>
                                handleMaxLevelChange(index, e.target.value)
                            }
                        >
                            {LEVELS.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    Max: {lvl}
                                </option>
                            ))}
                        </select>

                        <button onClick={() => handleRemove(index)}>✕</button>
                    </div>
                ))}

                <button onClick={handleSubmit} style={{ marginTop: 20 }}>
                    Save preferences
                </button>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    title: {
        color: "#0f0e0c",
        textAlign: "center",
        fontFamily: 'system-ui, "Noto Color Emoji", "Apple Color Emoji"',
    },
};