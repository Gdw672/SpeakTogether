import { useState } from "react";

import { Header } from "../../features/language/ui/main/Header";
import { LanguageTabs } from "../../features/language/ui/main/LanguageTabs";
import { Schedule } from "../../features/language/ui/main/Schedule";
import { getJwtData } from "../../features/auth/api/AuthHelper";
import { Language } from "../../features/Lesson/Language";


export const MainPage = () => {
    const data = getJwtData();

    const username =
        data?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    const [selectedLang, setSelectedLang] = useState<Language>(
        Language.English
    );

    return (
        <div style={styles.container}>
            <Header username={username} />

            <div style={styles.content}>
                <h3>Welcome to SpeakTogether</h3>

                <LanguageTabs
                    value={selectedLang}
                    onChange={setSelectedLang}
                />

                <Schedule selectedLang={selectedLang} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        width: "100%",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 60,
    },
} as const;