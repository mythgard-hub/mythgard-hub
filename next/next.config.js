module.exports = {
  env: {
    API_HOST: process.env.API_HOST,
    EMAIL_MG_CONTACT: process.env.EMAIL_MG_CONTACT,
    EMAIL_MG_SUPPORT: process.env.EMAIL_MG_SUPPORT,
    EMAIL_MG_EVENTS: process.env.EMAIL_MG_EVENTS,
    EMAIL_MG_BUSINESS: process.env.EMAIL_MG_BUSINESS,
    DISCORD_INVITE_URL: process.env.DISCORD_INVITE_URL,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME,
    MG_CDN: process.env.MG_CDN,
    MG_CARDS_CDN: process.env.MG_CARDS_CDN,
    SSR_HOST: process.env.SSR_HOST,
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
