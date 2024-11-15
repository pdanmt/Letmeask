import { extendTheme } from '@chakra-ui/react'

export const customLightTheme = extendTheme({
  colors: {
    black: '#29292e',
    shadow: '#050206',
    purple: '#835afd',
    purpleBg: '#f4f0ff',
    danger: '#E73F5D',
    gray: {
      100: '#DBDCDD',
      200: '#A8A8B3',
      300: '#737380',
    },
    white: {
      bg: '#F8F8F8',
      details: '#FEFEFE',
    },
    pink: {
      100: '#D67EE2',
      200: '#E559F9',
    },
    hover: {
      purple: '#6F4BD8',
      danger: '#D73754',
      gray100: '#CECECE',
      gray200: '#7E7E86',
    },
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },

      body: {
        bg: '#F8F8F8',
        color: '#29292e',
        WebkitFontSmoothing: 'antialiased',
      },

      'body, input, textarea, button': {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
      },
    },
  },
  breakpoints: {
    sm: '0px',
    md: '830px',
    lg: '1200px',
  },
})
