import { useState } from "react"
import { loginRequest } from "../api/AuthApi";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await loginRequest({ email, password })

            if (res.success) {
                setMessage(res.message)
            }
        } catch {
            setMessage("User is not exist or wrong password")
        }
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />

            {message && <p>{message}</p>}

            <p style={styles.registerText}>
                Don’t have an account yet?{" "}
                <Link to="/register" style={styles.link}>
                    Sign up
                </Link>
            </p>

            <button type="submit" style={styles.button}>
                Log In
            </button>

            {message && <p>{message}</p>}
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
    title: {
        color: "#0f0e0c",
        textAlign: "center",
    },

    registerText: {
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
}