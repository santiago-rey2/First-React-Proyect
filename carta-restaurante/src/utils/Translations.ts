import { useTranslation } from "react-i18next";

export const Translations = () => {
    const {t} = useTranslation();
    return {
        MENU_HEADER_TITLE: t("menuHeader.title"),
        NAVIGATION_HOME: t("menuHeader.navigation.home"),
        NAVIGATION_WINES: t("menuHeader.navigation.wines"),
        NAVIGATION_LANGUAGE: t("menuHeader.navigation.language"),
        NAVIGATION_LANGUAGE_FLAG: t("menuHeader.navigation.flag"),
        SECTION_SUGGESTIONS_TITLE: t("sections.suggestions.title"),
        SECTION_SUGGESTIONS_STARTERS: t("sections.suggestions.subsections.starters"),
        SECTION_SUGGESTIONS_MAIN: t("sections.suggestions.subsections.main"),
        SECTION_SUGGESTIONS_DESSERTS: t("sections.suggestions.subsections.desserts"),
        SECTION_STARTERS: t("sections.starters"),
        SECTION_SALADS: t("sections.salads"),
        SECTION_MEATS: t("sections.meats"),
        SECTION_FISH: t("sections.fish"),
        SECTION_SEAFOOD: t("sections.seafood"),
        SECTION_RICE: t("sections.rice"),
        SECTION_DESSERTS: t("sections.desserts"),
        SECTION_ALLERGENS: t("sections.allergens"),
        FOOTER_CONTACT: t("footer.contact"),
        FOOTER_LOCAL_NAME: t("footer.localName"),
        FOOTER_ADDRESS: t("footer.address"),
        FOOTER_PHONE: t("footer.phone"),
        FOOTER_LANDLINE: t("footer.landline"),
        FOOTER_EMAIL: t("footer.email"),
        FOOTER_WEBSITE: t("footer.website"),
        FOOTER_OPENING_HOURS: t("footer.opening hours")
    }
}