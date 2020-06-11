import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import red from '@material-ui/core/colors/red';


import { BrowserRouter as Router } from 'react-router-dom';

const myColor = red;

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#9a0036',
      contrastText: '#dedede'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

// Wrap the app in a provider tag (redux)
render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      {/* works the same as a CSS-reset */}
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
