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