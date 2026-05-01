import { useState } from "react";
import { HourRow } from "./HourRow";

import type { Language } from "../../../Lesson/Language";
import type { Lesson } from "../../../Lesson/Lesson";
import type { CreateLessonDTO } from "../../../Lesson/CreateLessonDTO";

import { lessonApi } from "../../../../features/Lesson/api/LessonApi";

export const Schedule = ({
    selectedLang,
}: {
    selectedLang: Language;
}) => {
    const hours = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, "0")
    );

    const [lessons, setLessons] = useState<Lesson[]>([]);

    const token = localStorage.getItem("token") || "";

    const handleCreate = async (dto: CreateLessonDTO) => {
        const createdLesson = await lessonApi.create(dto, token);

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

                        return (
                            hour === h &&
                            l.language === selectedLang
                        );
                    })}
                    onCreate={handleCreate}
                />
            ))}
        </div>
    );
};