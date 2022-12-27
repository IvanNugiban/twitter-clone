import {DefaultTheme} from "styled-components";
import ThemeEnum from "../types/enums/ThemeEnum";


export const whiteTheme: DefaultTheme = {
    backgroundColor: ThemeEnum.white,
    colors: {
        black: "#0F1419",
        gray: "#CBCCCE",
        gray_thin: "#EFF3F4",
        main: "#1D9BF0",
        alternative_main: "#1D9BF0",
        alternative_main_thin: "rgba(29, 161, 242, 0.2)",
        main_thin: "rgba(29, 161, 242, 0.2)",
        white: "#FFFFFF",
        danger_red: "#F52734",
        danger_red_thin: "#FEE8EA"
    },
    fontSizes: {
        title: "4rem",
        subTitle: "2.2rem",
        h3Title: "1.4rem",
        h4Title: "1.3rem",
        h5Title: "1.2rem",
        h6Title: "1.1rem",
        paragraph: "1rem"
    },

    media: {
        laptop: "(max-width: 1000px)",
        laptopL: "(max-width: 1300px)",
        tablet: "(max-width: 700px)",
        mobile: "(max-width: 400px)",
        mobileL: "(max-width: 500px)"
    }
}


export const lightsOutTheme : DefaultTheme = {
    ...whiteTheme,
    backgroundColor: ThemeEnum.lightsOut,
    colors: {
        ...whiteTheme.colors,
        white: "#EBEEEE",
        black: "#EBEEEE",
        gray_thin: "#2C3640FF",
        gray: "#75828F",
        alternative_main: "#FFFFFF",
        alternative_main_thin: "#2C3640FF",
        danger_red_thin: "#2C202C",
        danger_red: "#B5202E"
    }
}

export const dimTheme : DefaultTheme = {
    ...lightsOutTheme,
    backgroundColor: ThemeEnum.dim
}


