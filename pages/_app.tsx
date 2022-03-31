import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light'
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'sans-serif',
          colorScheme,
          primaryColor: colorScheme === 'dark' ? 'indigo' : 'teal'
          // colors: {
          //   brand: [
          //     '#F0BBDD',
          //     '#ED9BCF',
          //     '#EC7CC3',
          //     '#ED5DB8',
          //     '#F13EAF',
          //     '#F71FA7',
          //     '#FF00A1',
          //     '#E00890',
          //     '#C50E82',
          //     '#AD1374'
          //   ]
          // }
          // primaryColor: 'brand'
        }}
      >
        <ModalsProvider>
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
