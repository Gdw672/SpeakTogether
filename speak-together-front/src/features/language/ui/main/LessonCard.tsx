import { useState } from "react";
import { LangLevelLabel } from "../../../Lesson/LangLevel";
import { LanguageLabel } from "../../../Lesson/Language";
import type { Lesson } from "../../../Lesson/Lesson";
import { participantApi } from "../../../participians/ParticipiantApi";

export const LessonCard = ({

    lesson,
}: {
    lesson: Lesson;
    currentUserId: string | null;
}) => {
    const [isEnrolling, setIsEnrolling] = useState(false);

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const downloadFile = async (fileName: string) => {
        const url =
            "https://localhost:7173/Material/download/" + fileName;

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

    const enroll = async () => {
        try {
            setIsEnrolling(true);

            await participantApi.enroll(Number(lesson.id));

            // ❗ важно: НЕ держим state isEnrolled локально
            // теперь это управляется backend-данными
        } catch (e) {
            console.error("Enroll failed", e);
        } finally {
            setIsEnrolling(false);
        }
    };

    const isOwner = lesson.isOwner;
    const isEnrolled = lesson.isEnrolled;

    console.log("Materials:", lesson.materials);

    return (
        <div style={styles.card}>
            <div style={styles.title}>{lesson.name}</div>

            <div>
                <span>Description:</span> {lesson.description}
            </div>

            <div>
                <span>Language:</span>{" "}
                {LanguageLabel[lesson.language]}
            </div>

            <div>
                <span>Level:</span>{" "}
                {LangLevelLabel[lesson.langLevel]}
            </div>

            <div>
                <span>Start:</span>{" "}
                {formatTime(lesson.startDate)}
            </div>

            <div>
                <span>End:</span>{" "}
                {formatTime(lesson.endDate)}
            </div>

            {/* 👇 Enrollment logic */}
            <div style={{ marginTop: 10 }}>
                {isOwner ? (
                    <span style={{ fontWeight: 600 }}>
                        Это ваш урок
                    </span>
                ) : (
                    <button
                        style={styles.button}
                        onClick={enroll}
                        disabled={isEnrolling || isEnrolled}
                    >
                        {isEnrolled
                            ? "Вы записаны"
                            : isEnrolling
                                ? "Запись..."
                                : "Записаться"}
                    </button>
                )}
            </div>

            {/* Materials */}
            {lesson.materials?.length ? (
                <div style={{ marginTop: 10 }}>
                    <div style={{ fontWeight: 600 }}>
                        Materials:
                    </div>

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
                                    onClick={() =>
                                        downloadFile(m.path)
                                    }
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
        color: "#000",
    },
} as const;