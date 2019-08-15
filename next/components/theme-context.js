import React from 'react';
import { mgColors, mgFonts } from '../lib/theme.js';

export const themes = {
  dark: {
    background: mgColors.blackPearl,
    fontColor: mgColors.white,
    border: `2px solid ${mgColors.orange}`,
    fontFamily: mgFonts.exo2
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
