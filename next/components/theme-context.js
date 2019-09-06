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
    buttonOutline: `1px solid ${mgColors.orange}`,
    buttonOutlineOffset: '6px',
    buttonBorderDisabled: `2px solid ${mgColors.lightGray}`,
    inputBackground: mgColors.lightGray,
    inputBorder: `1px solid ${mgColors.lightBlue}`,
    inputPlaceholderTextColor: mgColors.lightBlue,
    zebraRowBackroung: mgColors.grayBlue,
    fontColorHeading: mgColors.blue
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
