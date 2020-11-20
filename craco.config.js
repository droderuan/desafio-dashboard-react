const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '@blue-5',
              '@layout-header-background': 'none'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
