import { useState } from "react";
import { changeLang } from "../api/translator";
import { LangType, reportHeader, LanguagesMap } from "../utils/constants";

const styles = {
    container: {
        backgroundColor: "#064c60",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
        padding: "1rem",
        width: "100%",
    },
    logo: {
        width: "10rem",
    },
    secondaryText: {
        color: "#fff",
    },
};

const ReportHeader = () => {
    // This can be a hook
    const [lang, setLang] = useState<LangType>('en');
    const onChangeLang = async (target: LangType) => {
        // TODO: this can be a loader
        setLang(target);
        await changeLang(lang, target);
    }
    return (
        <div style={styles.container}>
            <img
                alt="Logo"
                src={require("../static/logo.png")}
                style={styles.logo}
            />
            <span style={styles.secondaryText} translate="yes">
                {reportHeader.secondaryText}
            </span>
            <div>
                {Object.entries(LanguagesMap).map(([key, value], index) => {
                    return <button key={index} style={{ color: key === lang ? 'blue' : '' }} onClick={() => onChangeLang(key as LangType)}>{value}</button>
                })}
            {/* Add more languages as needed */}
        </div>
        </div>
    );
};

export default ReportHeader;
