export const Header = ({ username }: { username: string }) => {
    return (
        <div style={styles.topRight}>
            <div>{username}</div>
            <button style={styles.button}>👤</button>
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
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        cursor: "pointer",
    },
} as const;