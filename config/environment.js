const fs = require("fs");
const path = require("path");

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "authrex_dev",
  smtp: {
    service: "gmail", //set you mailer and configure
    host: "smtp.google.com",
    port: 587,
    secure: false,
    auth: {
      user: "ninjavertobro@gmail.com",
      pass: "11506373",
    },
  },
  google_clientID:
    "609041818828-03jnddkltrh5msk3o8gth5jn02193tpq.apps.googleusercontent.com",
  google_clientSecret: "8r0V2hiA4LFl0XtcYGlmJDm6",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "authrex",
};

const production = {
  name: "production",
  asset_path: process.env.AUTHREX_ASSET_PATH,
  session_cookie_key: process.env.AUTHREX_SESSION_COOKIE_KEY,
  db: process.env.AUTHREX_DATABASE,
  smtp: {
    service: process.env.AUTHREX_SMTP_SERVICE, //set you mailer and configure
    host: process.env.AUTHREX_SMTP_HOST,
    port: process.env.AUTHREX_SMTP_PORT,
    secure: process.env.AUTHREX_SMTP_SECURE,
    auth: {
      user: process.env.AUTHREX_SMTP_AUTH_USER,
      pass: process.env.AUTHREX_SMTP_AUTH_PASS,
    },
  },
  google_clientID: process.env.AUTHREX_GOOGLE_CLIENT_ID,
  google_clientSecret: process.env.AUTHREX_GOOGLE_CLIENT_SECRET,
  google_callbackURL: process.env.AUTHREX_GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.AUTHREX_JWT_SECRET,
  google_reCaptha_secret_key: process.env.AUTHREX_GOOGLE_RECAPTCHA_SECRET_KEY,
};

// console.log(process.env.AUTHREX_ENVIRONMENT + "isit");

module.exports =
  eval(process.env.AUTHREX_ENVIRONMENT) === undefined
    ? development
    : eval(process.env.AUTHREX_ENVIRONMENT);
