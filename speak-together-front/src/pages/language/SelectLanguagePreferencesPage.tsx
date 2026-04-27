import { AuthLayout } from "../../features/auth/ui/AuthLayout"
import { SelectLanguagePreferenceForm } from "../../features/language/ui/SelectLanguagePreferencesForm"

export const SelectLanguagePreferencesPage = () => {
    return (
        <AuthLayout>
            <SelectLanguagePreferenceForm />
        </AuthLayout>
    )
}