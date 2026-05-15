import { LangLevelLabel } from "../../../Lesson/LangLevel";
import { LanguageLabel } from "../../../Lesson/Language";
import type { Lesson } from "../../../Lesson/Lesson";

export const LessonCard = ({ lesson }: { lesson: Lesson }) => {
    console.log(lesson);
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (
        <div style={styles.card}>
            <div style={styles.title}>{lesson.name}</div>

            <div >
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
                        <div key={m.id} style={{ marginTop: 5 }}>
                            {m.type === "link" ? (
                                <a href={m.path} target="_blank" rel="noreferrer">
                                    🔗 {m.name}
                                </a>
                            ) : (
                                <a href={m.path} download>
                                     Download {m.name}
                                </a>
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
    row: {
        fontSize: 13,
        marginBottom: 4,
        color: "#333",
    },
} as const;