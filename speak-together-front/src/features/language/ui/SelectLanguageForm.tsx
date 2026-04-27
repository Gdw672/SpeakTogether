import { useState } from "react";
import { chooseLanguage } from "../api/LanguageApi";
import type { UserLanguageDto } from "../LanguageTypes";
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
    A1: 0, // Beginner
    A2: 1, // Elementary
    B1: 2, // Intermediate
    B2: 3, // Upper_Intermediate
    C1: 4, // Advanced
    C2: 5, // Proficient
};


export const SelectLanguageForm = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleAddLanguage = (lang) => {
        if (!lang) return;

        // не добавляем дубликаты
        if (selectedLanguages.find((l) => l.name === lang)) return;

        setSelectedLanguages([
            ...selectedLanguages,
            { name: lang, level: "B1" },
        ]);
    };

    const handleSubmit = async () => {
        const payload: UserLanguageDto[] = selectedLanguages.map((l) => ({
            language: LANGUAGE_MAP[l.name],
            level: LEVEL_MAP[l.level],
        }));

        console.log("🚀 Payload to backend:", payload);

        const token = getJwt();

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await chooseLanguage(payload, token);
            console.log("Saved");
        } catch (e) {
            console.error(e);
        }
    };

    const handleLevelChange = (index, level) => {
        const updated = [...selectedLanguages];
        updated[index].level = level;
        setSelectedLanguages(updated);
    };

    const handleRemove = (index) => {
        const updated = selectedLanguages.filter((_, i) => i !== index);
        setSelectedLanguages(updated);
    };

    return (
        <div style={{ padding: 20, maxWidth: 400 }}>
            <h2 style={styles.title}>Select your current language's skills</h2>

            <select onChange={(e) => handleAddLanguage(e.target.value)}>
                <option value="" >Select language</option>
                {LANGUAGES.map((lang) => (
                    <option value={lang.name}>
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
                            marginBottom: 10,
                        }}
                    >
                        <span style={{ width: 100 }}>{lang.name}</span>

                        <select
                            value={lang.level}
                            onChange={(e) =>
                                handleLevelChange(index, e.target.value)
                            }
                        >
                            {LEVELS.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    {lvl}
                                </option>
                            ))}
                        </select>

                        <button onClick={() => handleRemove(index)}>✕</button>

                        
                    </div>
                ))}
                <button onClick={handleSubmit} style={{ marginTop: 20 }}>
                    Save
                </button>
            </div>
        
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    form: { display: "flex", flexDirection: "column", gap: 12 },
   
    title: {
        color: "#0f0e0c",
        textAlign: "center",
        fontFamily: 'system-ui, "Noto Color Emoji", "Apple Color Emoji"',
    },
    body: {
        fontFamily:
            'system-ui, "Segoe UI", "Segoe UI Emoji", "Apple Color Emoji", sans-serif',
    },
}