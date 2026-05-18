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

            console.log("Добавленные материалы:", addedMaterials);
        }

        setLessons((prev) => [...prev, createdLesson]);
    };

    return (
        <div style={{ width: 400 }}>
            {hours.map((h) => (
                <HourRow
                    key={h}
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
            ))}
        </div>
    );
};