// have to map language names to the [react-intl locale, api query param options] pairs
const languages = {
  english: {
    code: 'en',
    locale: 'en',
    isUsed: true,
    isFontLoaded: true,
    fontFamily: ''
  },
  traditionalChinese: {
    code: 'tc',
    locale: 'zh-Hant',
    isUsed: true,
    isFontLoaded: false,
    fontFamily: 'Noto Sans TC'
  },
  simplifiedChinese: {
    code: 'zh',
    locale: 'zh',
    isUsed: false,
    isFontLoaded: false,
    fontFamily: 'Noto Sans SC'
  },
  japanese: {
    code: 'ja',
    locale: 'ja',
    isUsed: false,
    isFontLoaded: false,
    fontFamily: ''
  }
};

const languageCodeToLanguageMap = {};
Object.keys(languages).forEach(key => {
  languageCodeToLanguageMap[languages[key].code] = languages[key];
});

const usedLanguagesArray = [];
for (let language in languages) {
  if (languages[language].isUsed) {
    usedLanguagesArray.push(languages[language]);
  }
}

function getLanguageFromLanguageCode(languageCode) {
  return languageCodeToLanguageMap[languageCode];
}

// https://www.metamodpro.com/browser-language-codes
const browserLangIdCodeToMyLangCodeMapper = {
  en: languages.english,
  'en-au': languages.english,
  'en-bz': languages.english,
  'en-ca': languages.english,
  'en-ie': languages.english,
  'en-jm': languages.english,
  'en-ph': languages.english,
  'en-za': languages.english,
  'en-tt': languages.english,
  'en-gb': languages.english,
  'en-us': languages.english,
  'en-zw': languages.english,

  zh: languages.traditionalChinese,
  'zh-hk': languages.traditionalChinese,
  'zh-cn': languages.simplifiedChinese.isUsed
    ? languages.simplifiedChinese
    : languages.traditionalChinese,
  'zh-sg': languages.simplifiedChinese.isUsed
    ? languages.simplifiedChinese
    : languages.traditionalChinese,
  'zh-tw': languages.traditionalChinese,

  ja: languages.japanese.isUsed ? languages.japanese : languages.english
  // 'ja': languages.japanese
};

function getLanguageFromBrowserLangIdCode(browserLangIdCode) {
  return browserLangIdCodeToMyLangCodeMapper[browserLangIdCode];
}

const config = {
  gaTrackingId: 'UA-66792466-2',
  gaOptions: {
    // debug: true,
    // titleCase: false,
    // gaOptions: {
    //   userId: 123
    // }
  },
  googleTagManagerOptions: {
    gtmId: 'GTM-TBPBCCX'
  },
  defaultLanguage: languages.english,
  defaultFontFamily: 'sans-serif'
};

// console.log('GA', config.gaTrackingId);
// console.log('Google Tag Manager', config.googleTagManagerOptions.gtmId);

export {
  config,
  languages,
  usedLanguagesArray,
  getLanguageFromBrowserLangIdCode,
  getLanguageFromLanguageCode
};
