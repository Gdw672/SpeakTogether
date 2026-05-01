import { Language } from "../../../Lesson/Language";

const langs: { code: Language; label: string }[] = [
    { code: Language.English, label: "English" },
    { code: Language.German, label: "Deutsch" },
    { code: Language.French, label: "Français" },
];

export const LanguageTabs = ({
    value,
    onChange,
}: {
    value: Language;
    onChange: (v: Language) => void;
}) => {
    return (
        <div style={styles.wrapper}>
            {langs.map((l) => (
                <button
                    key={l.code}
                    onClick={() => onChange(l.code)}
                    style={{
                        ...styles.btn,
                        ...(value === l.code ? styles.active : {}),
                    }}
                >
                    {l.label}
                </button>
            ))}
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        gap: 10,
        marginBottom: 20,
    },
    btn: {
        padding: "6px 12px",
        cursor: "pointer",
    },
    active: {
        background: "#333",
        color: "#fff",
    },
} as const;