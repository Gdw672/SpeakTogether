import { useState } from "react"

export const RegisterForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ email, password })
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Регистрация</h2>

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

            <button style={styles.button}>Создать аккаунт</button>
        </form>
    )
}

const styles = {
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
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
    },
} as const