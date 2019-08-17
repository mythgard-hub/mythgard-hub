module.exports = {
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    USE_GOOGLE_ANALYTICS: process.env.NODE_ENV === 'production',
    MG_CDN: process.env.MG_CDN
  },
  webpackDevMiddleware: config => {
    config.watchOptions = Object.assign({}, config.watchOptions, {
      ignored: /node_modules/,
      poll: 500
    });
    return config;
  }
};
