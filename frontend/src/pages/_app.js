import Head from 'next/head';
import { useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    /*const sessionType = localStorage.getItem('sessionType');
    console.log(sessionType, window.location.pathname);
    if (window.location.pathname.startsWith("/manager/") && sessionType != "Manager") {
      window.location.href = "/managerLogin";
    } else if (window.location.pathname.startsWith("/student/") && sessionType != "Student") {
      window.location.href = "/";
    } else if (window.location.pathname == "/" && sessionType == "Manager") {
      window.location.href = "/manager/dashboard";
    } else if (window.location.pathname == "/" && sessionType == "Student") {
      window.location.href = "/student/dashboard";
    }*/
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Centralized Mess
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
