import {dimTheme, lightsOutTheme, whiteTheme} from "../theme/theme";
import ThemeStore from "../store/ThemeStore";
import ColorsEnum from "../types/enums/ColorsEnum";


class DisplayService {

    handleFontSizeChange(fontSizeLevel: string | null) {
        const documentStyle = document.documentElement.style;
        switch (fontSizeLevel) {
            case "1":
                documentStyle.fontSize = "14px";
                break
            case "2":
                documentStyle.fontSize = "15px"
                break
            case "3":
                documentStyle.fontSize = "16px"
                break
            case "4":
                documentStyle.fontSize = "17px"
                break
            case "5":
                documentStyle.fontSize = "18px"
                break
            default:
                documentStyle.fontSize = "16px"
        }
    }

    handleBackgroundColorChange(pickedBackgroundColor: string | null | undefined) {
        let theme;
        switch (pickedBackgroundColor) {
            case whiteTheme.backgroundColor:
                theme = whiteTheme;
                break
            case dimTheme.backgroundColor:
                theme = dimTheme;
                break
            case lightsOutTheme.backgroundColor:
                theme = lightsOutTheme;
                break
            default:
                theme = whiteTheme;
        }
        ThemeStore.setTheme(theme);
    }

    handleColorChange(color?: ColorsEnum | null) {
        ThemeStore.setColor(color || ColorsEnum.blue)
    }
}

export default new DisplayService();