import { LangLevelLabel } from "../../../Lesson/LangLevel";
import { LanguageLabel } from "../../../Lesson/Language";
import type { Lesson } from "../../../Lesson/Lesson";

export const LessonCard = ({ lesson }: { lesson: Lesson }) => {
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const downloadFile = async (fileName: string) => {
        const url = "https://localhost:7173/Material/download/" + fileName;
        const res = await fetch(url);

        if (!res.ok) {
            console.error("Download failed", await res.text());
            return;
        }

        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(blobUrl);
    };

    return (
        <div style={styles.card}>
            <div style={styles.title}>{lesson.name}</div>

            <div>
                <span>Description :</span> {lesson.description}
            </div>

            <div>
                <span>Language :</span> {LanguageLabel[lesson.language]}
            </div>

            <div>
                <span>Level :</span> {LangLevelLabel[lesson.langLevel]}
            </div>

            <div>
                <span>Start :</span> {formatTime(lesson.startDate)}
            </div>

            <div>
                <span>End :</span> {formatTime(lesson.endDate)}
            </div>

            {lesson.materials?.length ? (
                <div style={{ marginTop: 10 }}>
                    <div style={{ fontWeight: 600 }}>Materials:</div>

                    {lesson.materials.map((m) => (
                        <div key={m.id} style={{ marginTop: 6 }}>
                            {m.type === "link" ? (
                                <a
                                    href={m.path}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                     {m.name}
                                </a>
                            ) : (
                                <button
                                        onClick={() => {
                                            console.log(m.path);
                                            downloadFile(m.path);
                                        }}
                                    style={styles.button}
                                >
                                    ⬇ Download {m.name}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

const styles = {
    card: {
        padding: 10,
        border: "1px solid #ccc",
        marginTop: 5,
        borderRadius: 6,
    },

    title: {
        fontWeight: 600,
        marginBottom: 6,
    },

    button: {
        padding: "4px 8px",
        cursor: "pointer",
        border: "1px solid #999",
        borderRadius: 4,
        background: "#f5f5f5",
    },
} as const;