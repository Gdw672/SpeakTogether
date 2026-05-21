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
            <div>{username}</div>

            <div style={styles.row}>
                {/* 🔔 NOTIFICATIONS */}
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
                </button>            </div>
        </div>
    );
};

const styles = {
    topRight: {
        position: "absolute",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    notifWrapper: {
        position: "relative",
    },
    bell: {
        cursor: "pointer",
        fontSize: 20,
        position: "relative",
        userSelect: "none",
    },
    badge: {
        position: "absolute",
        top: -6,
        right: -10,
        background: "red",
        color: "white",
        borderRadius: "50%",
        width: 18,
        height: 18,
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    dropdown: {
        position: "absolute",
        top: 30,
        right: 0,
        width: 220,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
        overflow: "hidden",
    },
    item: {
        padding: 10,
        borderBottom: "1px solid #eee",
        fontSize: 14,
    },
    empty: {
        padding: 10,
        fontSize: 14,
        color: "#888",
        textAlign: "center",
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        cursor: "pointer",
    },
} as const;