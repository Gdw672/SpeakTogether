import { AuthLayout } from "../../features/auth/ui/AuthLayout"
import { SelectLanguageForm } from "../../features/language/ui/SelectLanguageForm"

export const SelectLanguagePage = () => {
    return (
        <AuthLayout>
            <SelectLanguageForm />
        </AuthLayout>
    )
}