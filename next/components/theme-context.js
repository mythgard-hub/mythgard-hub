import React from 'react';
import { mgColors, mgFonts } from '../lib/theme.js';

export const themes = {
  dark: {
    background: mgColors.blackPearl,
    backgroundLight: mgColors.blackPearlLight,
    fontColor: mgColors.white,
    fontColorSelected: mgColors.blue,
    fontColorDisabled: mgColors.lightGray,
    sectionBackground: mgColors.mediumGray,
    sectionBorder: `1px solid ${mgColors.lightBlue}`,
    tabBorder: `1px solid ${mgColors.lightBlue}`,
    tabColor: mgColors.lightBlue,
    border: `1px solid ${mgColors.orange}`,
    fontFamily: mgFonts.exo2,
    buttonBackground: mgColors.mediumGray,
    buttonBackgroundHover: mgColors.mediumLightGray,
    buttonOutline: `1px solid ${mgColors.orange}`,
    buttonOutlineOffset: '6px',
    buttonBorderDisabled: `2px solid ${mgColors.lightGray}`,
    buttonTextColor: `${mgColors.orange}`,
    inputBackground: mgColors.lightGray,
    inputBorder: `1px solid ${mgColors.lightBlue}`,
    inputPlaceholderTextColor: mgColors.lightBlue,
    zebraRowBackground: mgColors.grayBlue,
    fontColorHeading: mgColors.blue,
    essenceColor: mgColors.lightGreen,
    votesColor: mgColors.lightBlue,
    deckNameColor: mgColors.orange,
    welcomeBannerBackground: mgColors.orange,
    smallTitleColor: mgColors.blue,
    hoverColor: mgColors.blue,
    switchColor: mgColors.lightGreen,
    hrColorGradientLight: mgColors.blue,
    hrColorGradientDark: mgColors.darkBlue,
    footerBackgroundColor: mgColors.grayBlue,
    footerLinkColor: mgColors.orange,
    footerTextColor: mgColors.mediumLighterGray
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
