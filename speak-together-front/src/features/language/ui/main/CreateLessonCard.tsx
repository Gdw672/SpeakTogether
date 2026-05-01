import { useState } from "react";
import type { CreateLessonDTO } from "../../../Lesson/CreateLessonDTO.tsx";
import { LangLevel } from "../../../Lesson/LangLevel.tsx";
import { Language } from "../../../Lesson/Language.tsx";

export const CreateLessonCard = ({
    hour,
    onCreate,
}: {
    hour: string;
    onCreate: (l: CreateLessonDTO) => void;
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const buildStartDate = () => {
        const date = new Date();
        date.setHours(Number(hour), 0, 0, 0);
        return date.toISOString();
    };

    const buildEndDate = () => {
        const date = new Date();
        date.setHours(Number(hour) + 1, 0, 0, 0);
        return date.toISOString();
    };

    return (
        <div style={styles.card}>
            <input
                placeholder="Lesson name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                onClick={() =>
                    onCreate({
                        name,
                        description,
                        startDate: buildStartDate(),
                        endDate: buildEndDate(),

                        language: Language.English,
                        langLevel: LangLevel.Beginner,
                    })
                }
            >
                Save
            </button>
        </div>
    );
};

const styles = {
    card: {
        marginTop: 5,
        padding: 8,
        border: "1px dashed #aaa",
    },
} as const;