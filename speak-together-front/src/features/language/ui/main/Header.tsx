import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";

type Notification = {
    id: number;
    message: string;
};

export const Header = ({ username }: { username: string }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7173/notificationHub", {
                accessTokenFactory: () => localStorage.getItem("token") || ""
            })
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveNotification", (message: string) => {
            setNotifications(prev => [
                { id: Date.now(), message },
                ...prev
            ]);
        });

        const start = async () => {
            try {
                await connection.start();
                console.log("SignalR connected");
            } catch (err) {
                console.error("SignalR error:", err);
            }
        };

        start();

        return () => {
            connection.stop();
        };
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div style={styles.topRight}>
            <div style={styles.username}>{username}</div>

            <div style={styles.row}>
                <div ref={wrapperRef} style={styles.notifWrapper}>
                    <div
                        style={styles.bell}
                        onClick={() => setOpen(v => !v)}
                    >
                        🔔
                        {notifications.length > 0 && (
                            <span style={styles.badge}>
                                {notifications.length}
                            </span>
                        )}
                    </div>

                    {open && (
                        <div style={styles.dropdown}>
                            {notifications.length === 0 ? (
                                <div style={styles.empty}>
                                    Нет уведомлений
                                </div>
                            ) : (
                                notifications.slice(0, 5).map(n => (
                                    <div key={n.id} style={styles.item}>
                                        {n.message}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <button
                    style={styles.button}
                    onClick={() => navigate("/settings")}
                >
                    👤
                </button>
            </div>
        </div>
    );
};

const styles = {
    topRight: {
        position: "absolute" as const,
        top: 16,
        right: 400,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-end",
        gap: 6,
        fontFamily: "system-ui, sans-serif",
    },
    username: {
        fontSize: 14,
        fontWeight: "500",
        color: "#475569",
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    notifWrapper: {
        position: "relative" as const,
    },
    bell: {
        cursor: "pointer",
        fontSize: 18,
        position: "relative" as const,
        userSelect: "none" as const,
        padding: 4,
    },
    badge: {
        position: "absolute" as const,
        top: -2,
        right: -4,
        background: "#3b82f6", // Спокойный синий акцент вместо агрессивного красного
        color: "white",
        borderRadius: "50%",
        width: 16,
        height: 16,
        fontSize: 10,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    dropdown: {
        position: "absolute" as const,
        top: 32,
        right: 0,
        width: 240,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 6,
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        zIndex: 1000,
        overflow: "hidden",
    },
    item: {
        padding: "10px 12px",
        borderBottom: "1px solid #f1f5f9",
        fontSize: 13,
        color: "#334155",
        backgroundColor: "#ffffff",
    },
    empty: {
        padding: 12,
        fontSize: 13,
        color: "#94a3b8",
        textAlign: "center" as const,
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        cursor: "pointer",
        border: "1px solid #cbd5e1",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        padding: 0,
    },
} as const;