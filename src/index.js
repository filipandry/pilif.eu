import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import color from 'color';
import {ThemeProvider} from 'react-jss'

const colorPrimary="#FF7900";
const colorSecondary="#313131";

const theme = {
    colorPrimary:colorPrimary,
    colorPrimaryLighter: color(colorPrimary).lighten(0.5).hsl().string(),
    colorPrimaryDarker: color(colorPrimary).darken(0.5).hsl().string(),
    colorSecondary: colorSecondary,
    colorSecondaryLighter: color(colorSecondary).lighten(0.5).hsl().string(),
    colorSecondaryDarker: color(colorSecondary).darken(0.5).hsl().string(),
    fontColorSecondary: "#fff",
    fontColorPrimary: colorSecondary,
  };

ReactDOM.render(
    <ThemeProvider theme={theme}><App /></ThemeProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
