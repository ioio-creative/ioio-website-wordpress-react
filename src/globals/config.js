// have to map language names to the [react-intl locale, api query param options] pairs
const languages = {
  english: { code: 'en', locale: 'en'},
  simpliedChinese: {code: 'zh', locale: 'zh'},
  traditionalChinese: {code: 'tc', locale: 'zh-Hant'}
};

const languageCodeToLanguageMap = {};
Object.keys(languages).forEach((key) => {
  languageCodeToLanguageMap[languages[key].code] = languages[key];
});

function getLanguageFromLanguageCode(languageCode) {
  return languageCodeToLanguageMap[languageCode];
}

// https://www.metamodpro.com/browser-language-codes
const browserLangIdCodeToMyLangCodeMapper = {
  'en': languages.english,
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

  'zh': languages.simplifiedChinese,
  'zh-hk': languages.traditionalChinese,
  'zh-cn': languages.simplifiedChinese,
  'zh-sg': languages.simplifiedChinese,
  'zh-tw': languages.traditionalChinese, 
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
  defaultLanguage: languages.english
}

export {
  config,
  languages,
  getLanguageFromBrowserLangIdCode,
  getLanguageFromLanguageCode
};