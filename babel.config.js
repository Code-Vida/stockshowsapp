module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-paper/babel',
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          resources: './src/resources',
          // components: './src/components',
          screens: './src/screens',
          // assets: './src/assets',
          // theme: './src/theme',
        },
      },
    ],
  ],
}
