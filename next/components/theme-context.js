import React from 'react';
import { mgColors } from '../lib/theme.js';

export const themes = {
  dark: {
    background: mgColors.blackPearl,
    fontColor: mgColors.white,
    border: `1px solid ${mgColors.orange}`
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
