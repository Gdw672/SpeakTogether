import { useEffect, useState } from "react";
import { getJwt } from "../../auth/api/AuthHelper";
import { lessonApi } from "../../Lesson/api/LessonApi";
import type { Lesson } from "../../Lesson/Lesson";

export const LessonHistory = () => {
    const [history, setHistory] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = getJwt();
            if (!token) {
                setError("No token found");
                setLoading(false);
                return;
            }

            try {
                const data = await lessonApi.getHistory(token);
                setHistory(data);
            } catch (e) {
                console.error(e);
                setError("Failed to load history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div style={styles.screenWrapper}>
            <div style={styles.page}>
                <h2 style={styles.title}>Completed Lessons</h2>

                <div style={{ marginTop: 20 }}>
                    {loading && <p style={styles.textCentered}>Loading history...</p>}

                    {error && <p style={{ ...styles.textCentered, color: "#ef4444" }}>{error}</p>}

                    {!loading && !error && history.length === 0 && (
                        <p style={styles.textCentered}>No completed lessons found.</p>
                    )}

                    {!loading && !error && history.map((lesson) => (
                        <div key={lesson.id} style={styles.lessonCard}>
                            <div style={styles.lessonHeader}>
                                <span style={styles.lessonName}>{lesson.name}</span>
                                <span style={styles.badge}>
                                    {lesson.language} ({lesson.langLevel})
                                </span>
                            </div>

                            {lesson.description && (
                                <p style={styles.description}>{lesson.description}</p>
                            )}

                            <div style={styles.metaInfo}>
                                <span>📅 {formatDate(lesson.startDate)}</span>
                            </div>

                            {/* Роли пользователя */}
                            <div style={styles.roleContainer}>
                                {lesson.isOwner && <span style={styles.roleBadgeOwner}>Owner</span>}
                                {lesson.isEnrolled && <span style={styles.roleBadgeEnrolled}>Attended</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    screenWrapper: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8fafc", // Основной светлый фон приложения
        paddingTop: 40,
        paddingBottom: 40,
    },
    page: {
        padding: "0 20px",
        maxWidth: 480, // Сделал чуть шире, чтобы текст не сильно зажимался
        margin: "0 auto",
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#0f172a",
        textAlign: "center",
        margin: 0,
    },
    textCentered: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "15px",
    },
    lessonCard: {
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
    },
    lessonHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    lessonName: {
        fontWeight: "600",
        color: "#0f172a",
        fontSize: "16px",
    },
    badge: {
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        padding: "4px 8px",
        borderRadius: "6px",
        whiteSpace: "nowrap",
    },
    description: {
        margin: "10px 0",
        fontSize: "14px",
        color: "#334155",
        lineHeight: "1.5",
    },
    metaInfo: {
        fontSize: "13px",
        color: "#64748b",
        marginTop: "8px",
    },
    roleContainer: {
        display: "flex",
        gap: "6px",
        marginTop: "12px",
    },
    roleBadgeOwner: {
        fontSize: "11px",
        backgroundColor: "#eff6ff",
        color: "#1d4ed8",
        padding: "3px 8px",
        borderRadius: "4px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    roleBadgeEnrolled: {
        fontSize: "11px",
        backgroundColor: "#f0fdf4",
        color: "#15803d",
        padding: "3px 8px",
        borderRadius: "4px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    }
};