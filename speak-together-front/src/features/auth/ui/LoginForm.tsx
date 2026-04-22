import { useState } from "react"

export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ email, password })
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Вход</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />

            <button style={styles.button}>Войти</button>
        </form>
    )
}

const styles: Record<string, React.CSSProperties> = {
    form: { display: "flex", flexDirection: "column", gap: 12 },
    input: {
        padding: 10,
        borderRadius: 8,
        border: "1px solid #ccc",
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        border: "none",
        background: "#2563eb",
        color: "white",
        cursor: "pointer",
    },
}