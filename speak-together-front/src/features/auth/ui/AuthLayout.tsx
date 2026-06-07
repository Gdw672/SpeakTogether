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
        // Мягкий светлый серо-голубой градиент вместо темного
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    },
    card: {
        width: 360,
        padding: 24,
        borderRadius: 16,
        background: "#ffffff",
        // Сделали тень более мягкой и незаметной для светлого фона
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #f1f5f9", // Тонкая светлая граница для четкости
    },
    logo: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 22, // Чуть увеличили для акцента
        fontWeight: 700,
        color: "#0f172a", // Глубокий темный цвет вместо чисто черного (смотрится дороже)
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
}