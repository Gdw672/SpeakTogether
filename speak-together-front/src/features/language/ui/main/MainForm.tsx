import { getJwtData } from "../../../auth/api/AuthHelper";

export const MainForm = () => {
    const data = getJwtData();

    const username =
        data?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    const handleProfileClick = () => {
        console.log("Open profile");
    };

    return (
        <div style={styles.container}>
            <div style={styles.topRight}>
                <div style={styles.username}>{username}</div>

                <button style={styles.profileButton} onClick={handleProfileClick}>
                    👤
                </button>
            </div>

            <div style={styles.content}>
                <h1>Welcome to SpeakTogether</h1>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        width: "100%",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
    },

    topRight: {
        position: "absolute",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 5,
    },

    username: {
        fontSize: 14,
        fontWeight: 500,
        color: "#333",
    },

    profileButton: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid #ccc",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        fontSize: 18,
    },

    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
};