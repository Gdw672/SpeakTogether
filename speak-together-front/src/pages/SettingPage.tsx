import { useState } from "react";
import { chooseLanguage, choosePreferences } from "../features/language/api/LanguageApi";
import { getJwt } from "../features/auth/api/AuthHelper";
import { useNavigate } from "react-router-dom";

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


export const SettingsPage = () => {
    const navigate = useNavigate(); 
    const [skills, setSkills] = useState<{ name: string; level: string }[]>([]);
    const [preferences, setPreferences] = useState<
        { name: string; minLevel: string; maxLevel: string }[]
    >([]);

    const addSkillLanguage = (lang: string) => {
        if (!lang) return;
        if (skills.some((l) => l.name === lang)) return;

        setSkills([...skills, { name: lang, level: "B1" }]);
    };

    const changeSkillLevel = (index: number, level: string) => {
        const updated = [...skills];
        updated[index].level = level;
        setSkills(updated);
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const saveSkills = async () => {
        const token = getJwt();
        if (!token) return;

        const payload = skills.map((l) => ({
            language: LANGUAGE_MAP[l.name],
            level: LEVEL_MAP[l.level],
        }));

        await chooseLanguage(payload, token);

    };

    const addPreferenceLanguage = (lang: string) => {
        if (!lang) return;
        if (preferences.some((l) => l.name === lang)) return;

        setPreferences([
            ...preferences,
            { name: lang, minLevel: "A1", maxLevel: "B1" },
        ]);
    };

    const changeMinLevel = (index: number, level: string) => {
        const updated = [...preferences];
        updated[index].minLevel = level;
        setPreferences(updated);
    };

    const changeMaxLevel = (index: number, level: string) => {
        const updated = [...preferences];
        updated[index].maxLevel = level;
        setPreferences(updated);
    };

    const removePreference = (index: number) => {
        setPreferences(preferences.filter((_, i) => i !== index));
    };

    const savePreferences = async () => {
        const token = getJwt();
        if (!token) return;

        const payload = preferences.map((l) => ({
            language: LANGUAGE_MAP[l.name],
            minLevel: LEVEL_MAP[l.minLevel],
            maxLevel: LEVEL_MAP[l.maxLevel],
        }));

        await choosePreferences(payload, token);
    };


    return (
        <div style={styles.page}>
            <button onClick={() => navigate("/main")} style={styles.closeBtn}>
                ✕
            </button>
            <h1>Settings</h1>

            {}
            <section style={styles.section}>
                <h2>My language skills</h2>

                <select onChange={(e) => addSkillLanguage(e.target.value)}>
                    <option value="">Select language</option>
                    {LANGUAGES.map((l) => (
                        <option key={l.name} value={l.name}>
                            {l.flag} {l.name}
                        </option>
                    ))}
                </select>

                <div style={styles.list}>
                    {skills.map((l, index) => (
                        <div key={index} style={styles.row}>
                            <span style={{ width: 120 }}>{l.name}</span>

                            <select
                                value={l.level}
                                onChange={(e) =>
                                    changeSkillLevel(index, e.target.value)
                                }
                            >
                                {LEVELS.map((lvl) => (
                                    <option key={lvl} value={lvl}>
                                        {lvl}
                                    </option>
                                ))}
                            </select>

                            <button onClick={() => removeSkill(index)}>✕</button>
                        </div>
                    ))}
                </div>

                <button onClick={saveSkills}>Save skills</button>
            </section>

            <hr />

            {}
            <section style={styles.section}>
                <h2>My learning preferences</h2>

                <select onChange={(e) => addPreferenceLanguage(e.target.value)}>
                    <option value="">Select language</option>
                    {LANGUAGES.map((l) => (
                        <option key={l.name} value={l.name}>
                            {l.flag} {l.name}
                        </option>
                    ))}
                </select>

                <div style={styles.list}>
                    {preferences.map((l, index) => (
                        <div key={index} style={styles.row}>
                            <span style={{ width: 120 }}>{l.name}</span>

                            <select
                                value={l.minLevel}
                                onChange={(e) =>
                                    changeMinLevel(index, e.target.value)
                                }
                            >
                                {LEVELS.map((lvl) => (
                                    <option key={lvl} value={lvl}>
                                        {lvl}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={l.maxLevel}
                                onChange={(e) =>
                                    changeMaxLevel(index, e.target.value)
                                }
                            >
                                {LEVELS.map((lvl) => (
                                    <option key={lvl} value={lvl}>
                                        {lvl}
                                    </option>
                                ))}
                            </select>

                            <button onClick={() => removePreference(index)}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={savePreferences}>Save preferences</button>
            </section>
        </div>
    );
};


const styles: Record<string, React.CSSProperties> = {
    page: {
        padding: 20,
        maxWidth: 700,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
    },
    section: {
        marginBottom: 30,
    },
    list: {
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    row: {
        display: "flex",
        gap: 10,
        alignItems: "center",
    },
    closeBtn: {
        position: "fixed",
        top: 15,
        right: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontSize: 20,
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};