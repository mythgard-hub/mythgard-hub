module.exports = {
  env: {
    GA_TRACKING_ID: 'UA-142178156-1',
    USE_GOOGLE_ANALYTICS: process.env.NODE_ENV === 'production'
  }
};
