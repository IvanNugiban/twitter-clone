interface ITheme {
    backgroundColor: string,
    colors: {
        black: string,
        gray: string,
        gray_thin: string,
        main: string,
        main_thin: string,
        alternative_main: string,
        alternative_main_thin: string,
        white: string,
        danger_red: string,
        danger_red_thin: string,
    },
    fontSizes: {
        title: string,
        subTitle: string,
        h3Title: string,
        h4Title: string,
        h5Title: string,
        h6Title: string,
        paragraph: string
    },

    media: {
        laptop: string,
        laptopL: string,
        tablet: string,
        mobile: string,
        mobileL: string,
    }

}

export default ITheme;