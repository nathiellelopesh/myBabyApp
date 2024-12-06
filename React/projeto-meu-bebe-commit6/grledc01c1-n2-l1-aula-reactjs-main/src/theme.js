import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
        light: '#3D5C67',  // Um tom claro e suave de bege
        main: '#79C4A2',   // Um tom neutro de marrom claro
        dark: '#3D5C67',
      contrastText: '#fff',
    },
    secondary: {
      light: '#337a77',
      main: '#005955',
      dark: '#003e3b',
      contrastText: '#000',
    }
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
        light: '#6C8EB7',  
        main: '#1B3B79',   
        dark: '#141A30',   
        contrastText: '#fff',  
      },
      secondary: {
        light: '#66A0D7',  
        main: '#AFBAC0',   
        dark: '#1B3B79',   
        contrastText: '#000',
      },
  },
});

export {
    lightTheme,
    darkTheme
}