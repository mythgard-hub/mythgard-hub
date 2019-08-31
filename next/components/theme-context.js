import React from 'react';
import { mgColors, mgFonts } from '../lib/theme.js';

export const themes = {
  dark: {
    background: mgColors.blackPearl,
    backgroundLight: mgColors.blackPearlLight,
    fontColor: mgColors.white,
    fontColorSelected: mgColors.blue,
    sectionBackground: mgColors.mediumGray,
    sectionBorder: `2px solid ${mgColors.lightBlue}`,
    tabBorder: `1px solid ${mgColors.lightBlue}`,
    tabColor: mgColors.lightBlue,
    border: `1px solid ${mgColors.orange}`,
    fontFamily: mgFonts.exo2
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
