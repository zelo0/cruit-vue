module.exports = {
  mode: 'jit',
  darkMode: 'media',
  theme: {
    container: {
      center: true,
    },
    screens: {
      // xxs는 정상적으로 작동하지 않음
      xs: '350px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        night: {
          300: '#212121',
          200: '#303030',
          100: '#424242',
        },
      },
    },
  },
}
