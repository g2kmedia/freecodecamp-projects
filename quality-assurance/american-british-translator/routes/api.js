'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // Check required fields
      // Empty text
      if (text == "") {
        return res.json({ error: "No text to translate" });
      }

      // Missing locale or text
      if (!locale || !text) {
        return res.json({ error: "Required field(s) missing" });
      }

      // Invalid locale
      if (locale !== "american-to-british"
        && locale !== "british-to-american"
      ) {
        return res.json({ error: "Invalid value for locale field" });;
      }

      console.log(text, locale);
      // Translation
      const translation = translator.translate(text, locale);

      // Check if no translation was done
      if (text === translation) {
        return res.json({
          text: text,
          translation: "Everything looks good to me!"
        });
      }

      // Return translation
      return res.json({
        text: text,
        translation: translation
      });
    });
};
