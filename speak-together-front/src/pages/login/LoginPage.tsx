import { AuthLayout } from "../../features/auth/ui/AuthLayout"
import { LoginForm } from "../../features/auth/ui/LoginForm"

export const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}