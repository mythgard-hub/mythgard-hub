module.exports = {
  env: {
    GA_TRACKING_ID: 'UA-142178156-1',
    USE_GOOGLE_ANALYTICS: process.env.NODE_ENV === 'production'
  },
  webpackDevMiddleware: config => {
    config.watchOptions = Object.assign({}, config.watchOptions, {
      ignored: /node_modules/,
      poll: 500
    });
    return config;
  }
};
