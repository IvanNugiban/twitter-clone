import ITheme from "../types/interfaces/ITheme";
import {whiteTheme} from "../theme/theme";
import {makeAutoObservable} from "mobx";
import ColorsEnum from "../types/enums/ColorsEnum";
import DisplayService from "../services/displayService";


class ThemeStore {
    theme: ITheme = whiteTheme;
    mainColor: ColorsEnum = ColorsEnum.blue;

    constructor() {
        makeAutoObservable(this)
    }

    reset() {
        this.mainColor = ColorsEnum.blue;
        this.theme = whiteTheme;
    }

    initialize({color, theme}: { color?: ColorsEnum, theme?: string }) {
       DisplayService.handleColorChange(color);
       DisplayService.handleBackgroundColorChange(theme);
    }

    setTheme(theme: ITheme) {
        this.theme = theme;
        this.handleTheme();
    }

    setColor(color: ColorsEnum) {
        this.mainColor = color;
        this.handleTheme();
    }

    private handleTheme() {
        this.theme = {
            ...this.theme,
            colors: {
                ...this.theme.colors,
                main: this.mainColor,
                main_thin: this.mainColor + "33"
            }
        };
    }

}

export default new ThemeStore();