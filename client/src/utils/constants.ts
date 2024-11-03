// 
export const LanguagesMap = {
    'en': 'English',
    'es': 'Spanish',
    'de': 'Germen',
    'pt': 'Portuguese',
    'fr': 'French'
}
export type LangType = keyof typeof LanguagesMap;

export const reportBasicInfo = {
    service: "Service",
    date: "Date",
    reportTitle: "Report",
    hospitalDetailsTitle: "Hospital Details",
    patientDetailsTitle: "Patient Details",
    abnormalFindingsTitle: "Abnormal Findings",
    normalFindingsTitle: "Normal Findings",
    confidenceTitle: "Confidence",
};

export const reportHeader = {
    secondaryText: "Instant Point-of-Care Radiology Results",
};

export const loadingText = "Loading...";

export const additionalInformation = {
    title: "Additional Information",
};