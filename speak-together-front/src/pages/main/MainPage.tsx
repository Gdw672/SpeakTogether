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
                    <h3 style={styles.title}>Welcome to SpeakTogether</h3>

                    <div style={styles.tabsWrapper}>
                        <LanguageTabs
                            value={selectedLang}
                            onChange={setSelectedLang}
                        />
                    </div>

                    <Schedule />
                </div>
            </div>
        );
    };

    const styles = {
        container: {
            minHeight: "100vh",
            width: "100%",
            fontFamily: "system-ui, -apple-system, sans-serif",
            backgroundColor: "#f8fafc", // Светлый фон для всей страницы
            color: "#0f172a", // Темный текст для читаемости
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
            marginBottom: "16px",
        }
    } as const;