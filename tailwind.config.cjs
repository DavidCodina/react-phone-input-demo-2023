/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  corePlugins: {
    preflight: false
  },
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    // For this demo, I switched to Bootstrap breakpoints: https://getbootstrap.com/docs/5.3/layout/breakpoints/#available-breakpoints
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    ///////////////////////////////////////////////////////////////////////////
    //
    // https://tailwindcss.com/docs/customizing-colors
    // Why am I doing it in extend.colors? For some of the color names
    // it's not really necessary.
    //
    //   https://tailwindcss.com/docs/customizing-colors#adding-additional-colors
    //   If you’d like to add a brand new color to the default palette, add it in
    //   the theme.extend.colors section of your configuration file.
    //
    // Not sure, but it's also possible that not using extend will ultimately reset
    // ALL colors such, and we definitely don't want that. In other words theme.colors: {}
    // might result in NO colors except those explicitly defined.
    //
    // A good idea for extending colors would be to mod the default colors as needed, but
    // possibly also add primary, secondary, success, etc.
    //
    ///////////////////////////////////////////////////////////////////////////

    extend: {
      colors: {
        // https://maketintsandshades.com/
        // For colors I make 500 THE color, then take the 4 lighter as 1-400, and the 4 darker as 600-900.
        red: {
          100: '#ff869e',
          200: '#ff728e',
          300: '#ff5d7e',
          400: '#ff496e',
          500: '#FF355E', // Radical Red: https://www.w3schools.com/colors/colors_crayola.asp
          600: '#e63055',
          700: '#cc2a4b',
          800: '#b32542',
          900: '#992038'
        },

        // Lighter than the default (less of a mustard color).
        yellow: {
          100: '#ffeb80',
          200: '#ffe766',
          300: '#ffdf33',
          400: '#ffdb1a',
          500: '#ffd700', // Semantic UI Yellow: https://semantic-ui.com/usage/theming.html
          600: '#e6c200',
          700: '#ccac00',
          800: '#b39700',
          900: '#998100'
        },

        olive: {
          100: '#d3e074',
          200: '#cbdb5d',
          300: '#c4d646',
          400: '#bcd12f',
          500: '#B5CC18',
          600: '#a3b816',
          700: '#91a313',
          800: '#7f8f11',
          900: '#6d7a0e'
        },

        green: {
          100: '#84e184',
          200: '#70dc70',
          300: '#5bd75b',
          400: '#47d247',
          500: '#32cd32',
          600: '#2db92d',
          700: '#28a428',
          800: '#239023',
          900: '#1e7b1e'
        },

        // Very bright!
        pink: {
          100: '#ff72be',
          200: '#ff5bb3',
          300: '#ff43a9',
          400: '#ff2c9e',
          500: '#FF1493',
          600: '#e61284',
          700: '#cc1076',
          800: '#b30e67',
          900: '#990c58'
        },

        brown: {
          100: '#c9a48c',
          200: '#c09579',
          300: '#b78565',
          400: '#ae7652',
          500: '#A5673F',
          600: '#955d39',
          700: '#845232',
          800: '#73482c',
          900: '#633e26'
        },

        // Lighter than the default.
        gray: {
          100: '#adadad',
          200: '#9f9f9f',
          300: '#919191',
          400: '#848484',
          500: '#767676',
          600: '#6a6a6a',
          700: '#5e5e5e',
          800: '#535353',
          900: '#474747'
        },
        light: 'rgb(248, 249, 250)',
        dark: 'rgb(33, 37, 41)'
      },

      fontFamily: {
        sans: [
          ///////////////////////////////////////////////////////////////////////////
          //
          // Poppins was added. Everything else is in the sans array is the default.
          // The reason Poppins was added to sans is because sans is the default font:
          //
          //   https://tailwindcss.com/docs/font-family
          //   For convenience, Preflight sets the font family on the html element to match your
          //   configured sans font, so one way to change the default font for your project is to
          //   customize the sans key in your fontFamily configuration. See URL above for other
          //   approaches.
          //
          // The serif: [], and mono: [] are still implicitly applied.
          //
          ///////////////////////////////////////////////////////////////////////////
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
        // The serif and mono will stil be implied if ommitted.
        // serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        // mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      },

      // Any change made to colors necessitates updating the associated focus-* value.
      boxShadow: {
        //# Build this out further.
        'focus-red': '0 0 0 0.25rem rgba(255, 53, 94, 0.5)', // Based off of the rgb counterpart of the associated 500 value.
        'focus-orange': '0 0 0 0.25rem rgba(249, 115, 22, 0.5)',
        'focus-yellow': '0 0 0 0.25rem rgba(255, 215, 0, 0.5)',
        'focus-olive': '0 0 0 0.25rem rgba(181, 204, 24, 0.5)',
        'focus-green': '0 0 0 0.25rem rgba(50, 205, 50, 0.5)',
        'focus-teal': '0 0 0 0.25rem rgba(20, 184, 66, 0.5)',
        'focus-cyan': '0 0 0 0.25rem rgba(6, 182, 212, 0.5)',
        'focus-blue': '0 0 0 0.25rem rgba(59, 130, 246, 0.5)',
        'focus-violet': '0 0 0 0.25rem rgba(139, 92, 246, 0.5)',
        'focus-pink': '0 0 0 0.25rem rgba(255, 20, 147, 0.5)',
        'focus-purple': '0 0 0 0.25rem rgba(168, 85, 247, 0.5)',
        'focus-indigo': '0 0 0 0.25rem rgba(99, 102, 241, 0.5)',
        'focus-brown': '0 0 0 0.25rem rgba(165, 103, 63, 0.5)',
        'focus-gray': '0 0 0 0.25rem rgba(118, 118, 118, 0.5)'
      }
    }
  },

  plugins: [
    // https://tailwindcss.com/docs/plugins#adding-components
    // plugin(function ({ addComponents, theme, config }) {
    //   const buttons = {
    //     '.btn': {},

    //     '.btn-tan': {
    //       backgroundColor: config('theme.colors.blue.500'),
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: config('theme.colors.blue.700')
    //       }
    //     }
    //   }
    //   addComponents(buttons)
    // }),

    // Base styles can be changed through the plugin: https://tailwindcss.com/docs/plugins#adding-base-styles
    // However you can also extent preflight: https://tailwindcss.com/docs/preflight#extending-preflight

    plugin(function ({ addBase, config }) {
      addBase({
        body: {
          backgroundColor: 'rgb(237, 242, 249)',
          color: '#212529',
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5, // Preflight will already do this on html element, then body inherits it.
          margin: 0, // Preflight already does this.
          textAlign: 'left'
        },

        // By default, Tailwind Preflight does this:
        // h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }

        h1: {
          fontSize: '2.5rem',
          fontWeight: 500,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },

        h2: {
          fontSize: '2rem',
          fontWeight: 500,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },

        h3: {
          fontSize: '1.75rem',
          fontWeight: 500,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },

        h4: {
          fontSize: '1.5rem',
          fontWeight: 500,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },

        h5: {
          fontSize: '1.25rem',
          fontWeight: 500,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },

        h6: {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },

        p: {
          marginTop: 0,
          marginBottom: '1rem'
        },

        'p:last-child': {
          marginBottom: 0
        },

        hr: {
          margin: '1rem 0',
          color: 'inherit',
          backgroundColor: 'currentColor',
          border: 0,
          opacity: 0.25
        },

        a: {
          color: config('theme.colors.blue.500'),
          textDecoration: 'underline'
        },

        'a:hover': {
          color: config('theme.colors.blue.600')
        },

        'a:not([href]):not([class])': {
          color: 'inherit',
          textDecoration: 'none'
        },

        'a:not([href]):not([class]):hover': {
          color: 'inherit',
          textDecoration: 'none'
        },

        pre: {
          display: 'block',
          marginTop: 0,
          marginBottom: '1rem',
          overflow: 'auto',
          fontSize: '0.875em'
        },

        'pre code': {
          fontSize: 'inherit',
          color: 'inherit',
          wordBreak: 'normal'
        },

        code: {
          fontSize: '0.875em',
          color: config('theme.colors.pink.500'),
          wordWrap: 'break-word'
        },

        'a > code': {
          color: 'inherit'
        },

        button: {
          borderRadius: 0,
          lineHeight: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          margin: 0,
          textTransform: 'none'
        },

        'button:focus:not(:focus-visible)': {
          outline: 0
        },

        'button:not(:disabled)': {
          cursor: 'pointer'
        },

        "[role='button']": {
          cursor: 'pointer'
        },
        "[type='button']:not(:disabled)": {
          cursor: 'pointer'
        },

        "[type='reset']:not(:disabled)": {
          cursor: 'pointer'
        },

        "[type='submit']:not(:disabled)": {
          cursor: 'pointer'
        },

        table: {
          captionSide: 'bottom'
        },

        th: {
          textAlign: 'inherit',
          borderColor: 'inherit',
          borderStyle: 'solid',
          borderWidth: 0
        },

        td: {
          borderColor: 'inherit',
          borderStyle: 'solid',
          borderWidth: 0
        },

        tr: {
          borderColor: 'inherit',
          borderStyle: 'solid',
          borderWidth: 0
        },

        thead: {
          borderColor: 'inherit',
          borderStyle: 'solid',
          borderWidth: 0
        },

        tbody: {
          borderColor: 'inherit',
          borderStyle: 'solid',
          borderWidth: 0
        },

        tfoot: {
          borderColor: 'inherit',
          borderStyle: 'solid',
          borderWidth: 0
        },

        label: {
          display: 'inline-block'
        },

        input: {
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        },

        textarea: {
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          resize: 'vertical'
        },

        optgroup: {
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        },

        select: {
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          wordWrap: 'normal',
          textTransform: 'none'
        },

        'select:disabled': {
          opacity: 1
        },

        fieldset: {
          border: 0,
          margin: 0,
          minWidth: 0,
          padding: 0
        },

        iframe: {
          border: 0
        },

        summary: {
          display: 'list-item',
          cursor: 'pointer'
        },

        output: {
          display: 'inline-block'
        }
      })
    })
  ]
}
