const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // Gotcha: Initially, I did this, which could be okay.
    // However, once we add in the example app, it breaks storybook.
    // '../**/*.stories.@(js|jsx|ts|tsx)',
    // '../**/story.@(js|jsx|ts|tsx)'
    '../src/**/story.@(js|jsx|ts|tsx)' // Added This
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(c?js)$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false }
    })

    ///////////////////////////////////////////////////////////////////////////
    //
    // I'm using the storybook webpack5 build and the most recent version of the loaders.
    //
    //   "css-loader": "^6.7.3",
    //   "sass-loader": "^13.2.0",
    //   "style-loader": "^3.3.1"
    //
    // https://storybook.js.org/docs/react/builders/webpack
    // When configuring sass, DO NOT use the use a plugin/preset.
    // They are almost all super old. Instead just do this.
    //
    ///////////////////////////////////////////////////////////////////////////

    // .scss + postcss-loader for tailwind
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',

        {
          loader: 'css-loader',
          options: {
            // https://github.com/storybookjs/storybook/issues/17095
            // This part is important: We always need to apply postcss-loader before css-loader
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader', // required for tailwind
          options: { implementation: require.resolve('postcss') }
        },

        'sass-loader'
      ],

      include: path.resolve(__dirname, '../')
    })

    // .css + postcss-loader for tailwind
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        {
          loader: 'postcss-loader',
          options: { implementation: require.resolve('postcss') }
        }
      ],
      include: path.resolve(__dirname, '../')
    })

    return config
  }
}
