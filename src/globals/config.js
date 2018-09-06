// have to map language codes to the api query param options
const languages = {
  english: 'en',
  simpliedChinese: 'zh',
  traditionalChinese: 'tc'
};

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

  'zh': languages.traditionalChinese,
  'zh-hk': languages.traditionalChinese,
  'zh-cn': languages.simplifiedChinese,
  'zh-sg': languages.simplifiedChinese,
  'zh-tw': languages.traditionalChinese, 
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
  defaultLanguage: languages.traditionalChinese
}

export {
  config,
  languages
};