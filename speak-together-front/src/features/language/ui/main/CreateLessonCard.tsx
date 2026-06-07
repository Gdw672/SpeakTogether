import { useMemo, useState } from "react";
import type { CreateLessonDTO } from "../../../Lesson/CreateLessonDTO";
import { LangLevel } from "../../../Lesson/LangLevel";
import { Language } from "../../../Lesson/Language";
import { LanguageTabs } from "./LanguageTabs";

const toMinutes = (h: number, m: number) => h * 60 + m;

const fromMinutes = (total: number) => {
    const h = Math.floor(total / 60);
    const m = total % 60;
    return { h, m };
};

type AttachmentSlot = {
    type: "file" | "link";
    file: File | null;
    link: string;
};

export const CreateLessonCard = ({
    hour,
    onCreate,
}: {
    hour: string;
    onCreate: (
        l: CreateLessonDTO & {
            attachments: AttachmentSlot[];
        }
    ) => void;
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [startMinute, setStartMinute] = useState("00");
    const [endValue, setEndValue] = useState<number | null>(null);

    const [language, setLanguage] = useState<Language>(Language.English);

    const [langLevel, setLangLevel] = useState<LangLevel>(
        LangLevel.Beginner
    );

    const [attachments, setAttachments] = useState<AttachmentSlot[]>([
        { type: "file", file: null, link: "" },
        { type: "file", file: null, link: "" },
    ]);

    const updateAttachment = (
        index: number,
        value: Partial<AttachmentSlot>
    ) => {
        setAttachments((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, ...value } : item
            )
        );
    };

    const startHour = Number(hour);
    const startTotal = toMinutes(startHour, Number(startMinute));

    const endOptions = useMemo(() => {
        const max = startTotal + 40;
        const options: { value: number; label: string }[] = [];

        for (let t = startTotal; t <= max; t += 5) {
            const { h, m } = fromMinutes(t);
            options.push({
                value: t,
                label: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
            });
        }
        return options;
    }, [startTotal]);

    const buildDate = (totalMinutes: number) => {
        const { h, m } = fromMinutes(totalMinutes);
        const date = new Date();
        date.setHours(h, m, 0, 0);
        return date.toISOString();
    };

    return (
        <div style={styles.card}>
            <input
                style={styles.input}
                placeholder="Lesson name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                style={styles.input}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* LANGUAGE */}
            <div style={styles.row}>
                <span style={styles.label}>Language:</span>
                <LanguageTabs value={language} onChange={setLanguage} />
            </div>

            {/* LEVEL */}
            <div style={styles.row}>
                <span style={styles.label}>Level:</span>
                <select
                    style={styles.select}
                    value={langLevel}
                    onChange={(e) =>
                        setLangLevel(Number(e.target.value) as LangLevel)
                    }
                >
                    <option value={LangLevel.Beginner}>Beginner</option>
                    <option value={LangLevel.Elementary}>Elementary</option>
                    <option value={LangLevel.Intermediate}>Intermediate</option>
                    <option value={LangLevel.Upper_Intermediate}>Upper Intermediate</option>
                    <option value={LangLevel.Advanced}>Advanced</option>
                    <option value={LangLevel.Proficient}>Proficient</option>
                </select>
            </div>

            {/* START */}
            <div style={styles.row}>
                <span style={styles.label}>Start:</span>
                <select
                    style={styles.select}
                    value={startMinute}
                    onChange={(e) => {
                        setStartMinute(e.target.value);
                        setEndValue(null);
                    }}
                >
                    {Array.from({ length: 12 }, (_, i) =>
                        String(i * 5).padStart(2, "0")
                    ).map((m) => (
                        <option key={m} value={m}>
                            {startHour}:{m}
                        </option>
                    ))}
                </select>
            </div>

            {/* END */}
            <div style={styles.row}>
                <span style={styles.label}>End:</span>
                <select
                    style={styles.select}
                    value={endValue ?? ""}
                    onChange={(e) => setEndValue(Number(e.target.value))}
                >
                    <option value="" disabled>Select end time</option>
                    {endOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* ATTACHMENTS */}
            <div style={styles.attachments}>
                <strong>Materials</strong>

                {attachments.map((slot, index) => (
                    <div key={index} style={styles.attachmentCard}>
                        <div style={styles.row}>
                            <span style={styles.label}>Slot {index + 1}:</span>
                            <select
                                style={styles.select}
                                value={slot.type}
                                onChange={(e) =>
                                    updateAttachment(index, {
                                        type: e.target.value as AttachmentSlot["type"],
                                        file: null,
                                        link: "",
                                    })
                                }
                            >
                                <option value="file">File</option>
                                <option value="link">Link</option>
                            </select>
                        </div>

                        <div style={{ marginTop: 5 }}>
                            {slot.type === "file" ? (
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        updateAttachment(index, {
                                            file: e.target.files?.[0] ?? null,
                                        })
                                    }
                                />
                            ) : (
                                <input
                                    type="text"
                                    style={styles.input}
                                    placeholder="https://..."
                                    value={slot.link}
                                    onChange={(e) =>
                                        updateAttachment(index, {
                                            link: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                disabled={!endValue || !name}
                style={styles.button}
                onClick={() => {
                    console.log("FINAL LANGUAGE:", language);
                    onCreate({
                        name,
                        description,
                        startDate: buildDate(startTotal),
                        endDate: buildDate(endValue!),
                        langLevel,
                        language,
                        attachments,
                    });
                }}
            >
                Save
            </button>
        </div>
    );
};

const styles = {
    card: {
        marginTop: 10,
        padding: 16,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column" as const,
        gap: 10,
        color: "#0f172a",
        fontFamily: "sans-serif"
    },
    row: {
        display: "flex",
        gap: 8,
        alignItems: "center",
    },
    label: {
        fontSize: 14,
        color: "#334155",
    },
    input: {
        width: "100%",
        padding: "6px 10px",
        border: "1px solid #cbd5e1",
        borderRadius: 4,
        boxSizing: "border-box" as const,
        backgroundColor: "#ffffff",
        color: "#0f172a"
    },
    select: {
        padding: "4px 8px",
        border: "1px solid #cbd5e1",
        borderRadius: 4,
        backgroundColor: "#ffffff",
        color: "#0f172a"
    },
    attachments: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column" as const,
        gap: 8,
    },
    attachmentCard: {
        padding: 10,
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 6,
    },
    button: {
        marginTop: 5,
        padding: "8px 16px",
        background: "#0f172a",
        color: "#ffffff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: "bold"
    }
} as const;