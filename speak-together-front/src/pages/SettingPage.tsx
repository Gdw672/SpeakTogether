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
        // Внешний полноэкранный контейнер, который убирает черноту по бокам
        <div style={styles.screenWrapper}>
            <div style={styles.page}>
                <button onClick={() => navigate("/main")} style={styles.closeBtn}>
                    ✕
                </button>
                <h1 style={styles.title}>Settings</h1>

                {/* SKILLS */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>My language skills</h2>

                    <select
                        style={styles.select}
                        onChange={(e) => {
                            addSkillLanguage(e.target.value);
                            e.target.value = "";
                        }}
                    >
                        <option value="">Select language</option>
                        {LANGUAGES.map((l) => (
                            <option key={l.name} value={l.name}>
                                {l.flag} {l.name}
                            </option>
                        ))}
                    </select>

                    <div style={styles.list}>
                        {skills.map((l, index) => (
                            <div key={index} style={styles.rowCard}>
                                <span style={styles.langName}>{l.name}</span>

                                <select
                                    style={styles.selectSmall}
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

                                <button style={styles.deleteBtn} onClick={() => removeSkill(index)}>✕</button>
                            </div>
                        ))}
                    </div>

                    <button style={styles.saveBtn} onClick={saveSkills}>Save skills</button>
                </section>

                <hr style={styles.hr} />

                {/* PREFERENCES */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>My learning preferences</h2>

                    <select
                        style={styles.select}
                        onChange={(e) => {
                            addPreferenceLanguage(e.target.value);
                            e.target.value = "";
                        }}
                    >
                        <option value="">Select language</option>
                        {LANGUAGES.map((l) => (
                            <option key={l.name} value={l.name}>
                                {l.flag} {l.name}
                            </option>
                        ))}
                    </select>

                    <div style={styles.list}>
                        {preferences.map((l, index) => (
                            <div key={index} style={styles.rowCard}>
                                <span style={styles.langName}>{l.name}</span>

                                <div style={styles.rangeWrapper}>
                                    <span style={styles.rangeLabel}>from</span>
                                    <select
                                        style={styles.selectSmall}
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

                                    <span style={styles.rangeLabel}>to</span>
                                    <select
                                        style={styles.selectSmall}
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
                                </div>

                                <button style={styles.deleteBtn} onClick={() => removePreference(index)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <button style={styles.saveBtn} onClick={savePreferences}>Save preferences</button>
                </section>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    screenWrapper: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8fafc", // Растягиваем светлый фон на абсолютно весь экран
    },
    page: {
        padding: "40px 20px",
        maxWidth: 600,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#0f172a",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#334155",
        marginBottom: 12,
    },
    select: {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #cbd5e1",
        borderRadius: 6,
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontSize: 15,
        outline: "none",
    },
    selectSmall: {
        padding: "6px 10px",
        border: "1px solid #cbd5e1",
        borderRadius: 4,
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontSize: 14,
    },
    list: {
        marginTop: 12,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    rowCard: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 6,
    },
    langName: {
        fontSize: 15,
        fontWeight: "500",
        color: "#0f172a",
        flex: 1,
    },
    rangeWrapper: {
        display: "flex",
        alignItems: "center",
        gap: 6,
    },
    rangeLabel: {
        fontSize: 13,
        color: "#64748b",
    },
    deleteBtn: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        cursor: "pointer",
        fontSize: 14,
        padding: "4px 8px",
    },
    saveBtn: {
        padding: "10px 20px",
        background: "#0f172a",
        color: "#ffffff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: "600",
        backgroundColor: "#30302f",
        fontSize: 14,
    },
    hr: {
        border: "none",
        borderTop: "1px solid #e2e8f0",
        margin: "24px 0",
    },
    closeBtn: {
        position: "fixed",
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid #cbd5e1",
        cursor: "pointer",
        fontSize: 14,
        backgroundColor: "#ffffff",
        color: "#334155",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
};