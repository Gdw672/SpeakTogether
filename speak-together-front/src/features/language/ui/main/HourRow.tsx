import { useState } from "react";
import { LessonCard } from "./LessonCard";
import { CreateLessonCard } from "./CreateLessonCard";
import type { CreateLessonDTO } from "../../../Lesson/CreateLessonDTO";
import type { Lesson } from "../../../Lesson/Lesson";

export const HourRow = ({
    hour,
    lessons,
    onCreate,
}: {
    hour: string;
    lessons: Lesson[];
    onCreate: (l: CreateLessonDTO) => void;
}) => {
    const [creating, setCreating] = useState(false);

    return (
        <div style={styles.row}>
            <div style={styles.header}>
                <span>{hour}:00</span>
                <button onClick={() => setCreating((p) => !p)}>＋</button>
            </div>

            {lessons.map((l) => (
                <LessonCard key={l.id} lesson={l} />
            ))}

            {creating && (
                <CreateLessonCard
                    hour={hour}
                    onCreate={onCreate}
                />
            )}
        </div>
    );
};

const styles = {
    row: {
        marginBottom: 30,
        borderBottom: "1px solid #eee",
        paddingBottom: 10,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
} as const;