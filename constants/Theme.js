const tintColor = '#537ec5';
const black =  "#323643";
const white = "#FFFFFF";

const Colors = {
    tintColor,
    tabIconDefault: black,
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: white,
    accent: "#F3534A",
    primary: "#0AC4BA",
    secondary: "#010038",
    tertiary: "#FFE358",
    markerColor: '#537ec5',
    black,
    white,
    overlay: '#C1BEC0',
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
};

const Sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,
    margin: 25,
  
    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
};
  
const Fonts = {
    h1: {
      fontSize: Sizes.h1
    },
    h2: {
      fontSize: Sizes.h2
    },
    h3: {
      fontSize: Sizes.h3
    },
    header: {
      fontSize: Sizes.header
    },
    title: {
      fontSize: Sizes.title
    },
    body: {
      fontSize: Sizes.body
    },
    caption: {
      fontSize: Sizes.caption
    },
};


export { Colors, Sizes, Fonts };