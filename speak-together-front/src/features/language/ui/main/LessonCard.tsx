import type { Lesson } from "../../../Lesson/Lesson";

export const LessonCard = ({ lesson }: { lesson: Lesson }) => {
    return (
        <div style={styles.card}>
            <div>{lesson.name}</div>
            <div style={styles.time}>{lesson.startDate}</div>
        </div>
    );
};

const styles = {
    card: {
        padding: 8,
        border: "1px solid #ccc",
        marginTop: 5,
        borderRadius: 6,
    },
    time: {
        fontSize: 12,
        color: "#666",
    },
} as const;