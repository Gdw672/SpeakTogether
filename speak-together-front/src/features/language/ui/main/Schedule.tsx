import { useEffect, useState } from "react";
import { HourRow } from "./HourRow";

import type { Lesson } from "../../../Lesson/Lesson";
import type { CreateLessonDTO } from "../../../Lesson/CreateLessonDTO";

import { lessonApi } from "../../../../features/Lesson/api/LessonApi";
import { getUserIdFromJwt } from "../../../../features/auth/api/AuthHelper";

export const Schedule = () => {
    const hours = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, "0")
    );

    const [lessons, setLessons] = useState<Lesson[]>([]);

    const token = localStorage.getItem("token") || "";

    const currentUserId = getUserIdFromJwt();

    useEffect(() => {
        const load = async () => {
            const data = await lessonApi.getLessons(token);
            setLessons(data);
        };

        if (token) {
            load();
        }
    }, [token]);

    const handleCreate = async (
        dto: CreateLessonDTO & {
            attachments: {
                type: "file" | "link";
                file: File | null;
                link: string;
            }[];
        }
    ) => {
        const createdLesson = await lessonApi.create(dto, token);

        const files = dto.attachments
            .filter((x) => x.type === "file" && x.file)
            .map((x) => x.file!);

        const links = dto.attachments
            .filter((x) => x.type === "link" && x.link)
            .map((x) => x.link);

        if (files.length > 0 || links.length > 0) {
            const addedMaterials = await lessonApi.addMaterials(
                {
                    lessonId: createdLesson.id,
                    files,
                    links,
                },
                token
            );

            console.log("Added materials:", addedMaterials);
        }

        // Обновляем список, чтобы сразу увидеть новый урок в расписании
        setLessons((prev) => [...prev, createdLesson]);
    };

    return (
        <div style={styles.container}>
            {hours.map((h) => (
                <div key={h} style={styles.rowWrapper}>
                    <HourRow
                        hour={h}
                        lessons={lessons.filter((l) => {
                            const hour = new Date(l.startDate)
                                .getHours()
                                .toString()
                                .padStart(2, "0");

                            return hour === h;
                        })}
                        onCreate={handleCreate}
                        currentUserId={currentUserId}
                    />
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        width: 400,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        padding: "8px 0",
        fontFamily: "sans-serif",
    },
    rowWrapper: {
        borderBottom: "1px solid #aaa",
        padding: "4px 12px",
    }
} as const;