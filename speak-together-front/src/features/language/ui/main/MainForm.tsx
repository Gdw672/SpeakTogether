import { useState } from "react";
import { getJwtData } from "../../../auth/api/AuthHelper";
import { Header } from "./Header";
import { LanguageTabs } from "./LanguageTabs";
import { Schedule } from "./Schedule";

import { Language } from "../../../Lesson/Language";

export const MainForm = () => {
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
                <h3 style={styles.title}>Welcome to SpeakTogether</h3>

                <div style={styles.tabsWrapper}>
                    <LanguageTabs
                        value={selectedLang}
                        onChange={setSelectedLang}
                    />
                </div>

                <Schedule selectedLang={selectedLang} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        width: "100%",
        position: "relative" as const,
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#f8fafc", // Светлый дефолтный фон для всего приложения
        color: "#0f172a", // Темно-серый текст вместо жесткого черного
    },
    content: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        paddingTop: 40,
    },
    title: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#1e293b",
        margin: "0 0 16px 0",
    },
    tabsWrapper: {
        marginBottom: "16px", // Аккуратный отступ между табами и расписанием
    }
} as const;