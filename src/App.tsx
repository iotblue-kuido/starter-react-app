import { Suspense, StrictMode } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import en from './i18n/en';
import ar from './i18n/ar';
import { Routes } from './router';
import { BrowserRouter } from 'react-router-dom';
import AppsTheme from './Theme/theme';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/500.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import ErrorBoundary from './components/ErrorBoundary';
import { user_prefered_language } from './shared/constants';

import './App.css'
import AuthShield from './components/auth/AuthShield';
import NavBar from './components/NavBar';
import MainLayout from './components/MainLayout';

function App() {
  const userPreferedLanguage = localStorage.getItem(user_prefered_language);

  if (!userPreferedLanguage) {
    localStorage.setItem(user_prefered_language, 'ar');
  }
  // Initialize the i18n library with en as the default lang
  i18n.init({
    lng: userPreferedLanguage || 'en',
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
  });
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={'..loading'}>
        <StyledEngineProvider injectFirst>
          <AppsTheme>
            <AuthShield>
              <StrictMode>
                <BrowserRouter>
                  <ErrorBoundary>
                    <MainLayout>
                      <Routes />
                    </MainLayout>
                  </ErrorBoundary>
                </BrowserRouter>
              </StrictMode>
            </AuthShield>
          </AppsTheme>
        </StyledEngineProvider>
      </Suspense>
    </I18nextProvider>
  )
}

export default App
