/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{vue,ts,scss}',
    'index.html'
  ],
  theme: {
    colors: {
      'gray': {
        50: '#f7f8fa',
        100: '#f2f3f5',
        200: '#e5e6e8',
        300: '#c9cdd4',
        400: '#a9aeb8',
        500: '#86909c',
        600: '#6b7785',
        700: '#4e5969',
        800: '#272e3b',
        900: '#1d2129'
      },
      'blue': {
        50: '#E8F3FF',
        100: '#BEDAFF',
        200: '#94BFFF',
        300: '#6AA1FF',
        400: '#4080FF',
        500: '#165DFF',
        600: '#0E42D2',
        700: '#072CA6',
        800: '#031A79',
        900: '#000D4D'
      },
      'red': {
        50: '#FFECE8',
        100: '#FDCDC5',
        200: '#FBACA3',
        300: '#F98981',
        400: '#F76560',
        500: '#F53F3F',
        600: '#CB272D',
        700: '#A1151E',
        800: '#770813',
        900: '#4D000A'
      },
      'green': {
        50: '#E8FFEA',
        100: '#AFF0B5',
        200: '#7BE188',
        300: '#4CD263',
        400: '#23C343',
        500: '#00B42A',
        600: '#009A29',
        700: '#008026',
        800: '#006622',
        900: '#004D1C'
      },
      'yellow': {
        50: '#FFF7E8',
        100: '#FFE4BA',
        200: '#FFCF8B',
        300: '#FFB65D',
        400: '#FF9A2E',
        500: '#FF7D00',
        600: '#D25F00',
        700: '#A64500',
        800: '#792E00',
        900: '#4D1B00'
      },
      'slate': colors.slate,
      'black': colors.black,
      'currentColor': colors.currentColor,
      'white': colors.white,
      'orange': colors.orange,
      'amber': colors.amber,
      'lime': colors.lime,
      'teal': colors.teal,
      'emerald': colors.emerald,
      'cyan': colors.cyan,
      'sky': colors.sky,
      'indigo': colors.indigo,
      'violet': colors.violet,
      'purple': colors.purple,
      'fuchsia': colors.fuchsia,
      'pink': colors.pink,
      'rose': colors.rose,
      'transparent': colors.transparent
    }
  },
  plugins: [],
}
