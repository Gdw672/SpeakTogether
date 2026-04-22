import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1 style={styles.logo}>SpeakTogether</h1>
                {children}
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
    },
    card: {
        width: 360,
        padding: 24,
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    logo: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 600,
    },
}