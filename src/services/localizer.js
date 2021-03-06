import locales from '../locales/locales.js';

export class Localizer {
  /**
   * Initializes a new Localizer instance.
   * @param {string} fallbackLanguage  The fallback language.
   * @param {boolean} useKeyIfMissing Determines, if the key should be used if translation is missing.
   * @return {Localizer}  The new Localizer instance.
   */
  constructor(fallbackLanguage = 'en', useKeyIfMissing = true) {
    this._language = fallbackLanguage;
    this._fallbackLanguage = fallbackLanguage;
    this._useKeyIfMissing = useKeyIfMissing;
    this._languageChangedCallbacks = [];
  }

  /**
   * Sets the language used for localization.
   * @param {string} language The language.
   * @return {void}
   */
  setLanguage(language) {
    this._language = language;
    this._languageChangedCallbacks.forEach(callback => callback(language));
  }

  /**
   * Registers an event listener for changes of the language.
   * @param  {Function} callback The callback.
   * @return {void}
   */
  onLanguageChanged(callback) {
    this._languageChangedCallbacks.push(callback);
  }

  /**
   * Translates a message to the configured language.
   * @param  {stirng} key The key of the message.
   * @return {string} The localized message.
   */
  localize(key) {
    return this._getMessage(key, this._language) ||
           this._getMessage(key, this._fallbackLanguage) ||
           this._getFallbackMessage(key);
  }

  /**
   * Gets a mesage in a specific language.
   * @param  {stirng} key The key of the message.
   * @param  {string} language The language of the message.
   * @return {string} The localized message.
   */
  _getMessage(key, language) {
    if(!key || !locales || !this._language || !locales[language]) {
      return;
    }

    let translatedValue = locales[language][key];
    if(translatedValue) {
      return translatedValue;
    }
  }

  /**
   * Gets a fallback message that is used if a translation is missing.
   * @param  {stirng} key The key of the message.
   * @return {string} The fallback message.
   */
  _getFallbackMessage(key) {
    return this._useKeyIfMissing ? key : '';
  }
}
