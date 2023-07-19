import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './lightTheme';
import { useTranslation } from 'react-i18next';
import { user_prefered_theme_mode } from '../shared/constants';
import { UserPreferedContext } from '../shared/Contexts/UserPreferedContext';
import { darkTheme } from './darkTheme';

interface Props {
	children: React.ReactNode;
}

function AppsTheme({ children }: Props) {
	const { i18n } = useTranslation();

	const [mode, setMode] = React.useState<'light' | 'dark'>(localStorage.getItem(user_prefered_theme_mode) as 'light' | 'dark' || 'light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					const newMode = prevMode === 'light' ? 'dark' : 'light'
					localStorage.setItem(user_prefered_theme_mode, newMode)
					return (newMode)
				});
			},
		}),
		[],
	);
	const selectedLanguage = React.useMemo(
		() => ({
			changeLanguage: (newLang: string | undefined) => {
				i18n.changeLanguage(newLang);
			},
		}),
		[],
	);

	return (
		<UserPreferedContext.Provider value={{ ...colorMode, ...selectedLanguage }}>
			<ThemeProvider theme={mode === 'dark' ? { ...darkTheme, direction: i18n.dir } : { ...lightTheme, direction: i18n.dir }}>
				<CssBaseline /> {children}
			</ThemeProvider>
		</UserPreferedContext.Provider>
	);
}

export default AppsTheme;
