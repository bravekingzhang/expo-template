import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './en';
import zh from './zh';

const i18n = new I18n({
  en,
  zh,
});

// Set the locale once at the beginning of your app.
i18n.locale = Localization.getLocales()[0].languageTag;

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
