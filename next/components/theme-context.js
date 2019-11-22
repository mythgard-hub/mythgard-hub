import React from 'react';
import { mgColors, mgFonts } from '../lib/theme.js';

export const themes = {
  dark: {
    background: mgColors.blackPearl,
    backgroundLight: mgColors.blackPearlLight,
    fontColor: mgColors.white,
    fontColorAccent: mgColors.orange,
    fontColorSubtle: mgColors.lightBlue,
    fontColorSelected: mgColors.blue,
    fontColorDisabled: mgColors.mediumLightGray,
    sectionBackground: mgColors.mediumGray,
    sectionBorder: `1px solid ${mgColors.lightBlue}`,
    tabBorder: `1px solid ${mgColors.lightBlue}`,
    tabColor: mgColors.lightBlue,
    border: `1px solid ${mgColors.orange}`,
    borderAccent: `1px solid ${mgColors.blue}`,
    cardTableBorder: `1px solid ${mgColors.darkGray}`,
    fontFamily: mgFonts.exo2,
    buttonBackground: mgColors.mediumGray,
    buttonBackgroundHover: mgColors.mediumLightGray,
    buttonOutline: `1px solid ${mgColors.orange}`,
    buttonOutlineOffset: '6px',
    buttonBorderDisabled: `2px solid ${mgColors.mediumLightGray}`,
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
    hrColorGradientDark: mgColors.grayBlue,
    footerBackgroundColor: mgColors.grayBlue,
    footerLinkColor: mgColors.orange,
    footerTextColor: mgColors.mediumLighterGray,
    selectedPageColor: mgColors.blue,
    orangeSeparatorColor: mgColors.orange,
    orangeSeparatorSecondaryColor: mgColors.blackPearl,
    blueFactionColor: mgColors.blue,
    redFactionColor: mgColors.red,
    yellowFactionColor: mgColors.yellow,
    orangeFactionColor: mgColors.darkOrange,
    greenFactionColor: mgColors.green,
    purpleFactionColor: mgColors.purple,
    cardTableName: mgColors.mediumGray,
    panelBackground: mgColors.grayBlue,
    cardTableRowQuantityBackground: mgColors.blackPearl,
    spacing: 20,
    cardSpacing: 15
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
