import { AuthLayout } from "../../features/auth/ui/AuthLayout"
import { RegisterForm } from "../../features/auth/ui/RegisterForm"

export const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}