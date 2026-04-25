import { useState } from "react"
import { registerRequest } from "../api/AuthApi";
import { Link } from "react-router-dom";


export const RegisterForm = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await registerRequest({ username, email, password })

        setMessage(res.message)

        console.log(res)
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Register</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />

            {message && <p>{message}</p>}

            <button style={styles.button}>Sigh Up</button>

            <p style={styles.loginText}>
                Already have an account?{" "}
                <Link to="/" style={styles.link}>
                    Sign In
                </Link>
            </p>

            {message && <p>{message}</p>}

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

    title: {
        color: "#0f0e0c",
        textAlign: "center",
    },

    loginText: {
        marginTop: 12,
        textAlign: "center",
        fontSize: 14,
        color: "#666",
    },
    link: {
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: 500,
        cursor: "pointer",
    }
} as const