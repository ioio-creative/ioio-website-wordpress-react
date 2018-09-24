// https://github.com/austintackaberry/i18n-example/blob/master/scripts/mergeMessages.js
// https://medium.freecodecamp.org/setting-up-internationalization-in-react-from-start-to-finish-6cb94a7af725
// https://medium.freecodecamp.org/internationalization-in-react-7264738274a0

// import * as fs from "fs";
// import { sync as globSync } from "glob";
// import { sync as mkdirpSync } from "mkdirp";
// import last from "lodash/last";

const fs = require('fs');
const globSync = require('glob').sync;
const mkdirpSync = require('mkdirp').sync;
const last = require('lodash/last');

const MESSAGES_PATTERN = "../src/messages/**/*.json";
const LANG_DIR = "../src/locales/";
const LANG_PATTERN = "../src/locales/*.json";

// Try to delete current json files from public/locales
try {
  fs.unlinkSync(`${LANG_DIR}data.json`);
} catch (error) {
  console.log(error);
}

// Merge translated json files (es.json, fr.json, etc) into one object
// so that they can be merged with the aggregated "en" object below

const mergedTranslations = globSync(LANG_PATTERN)
  .map(filename => {
    const locale = last(filename.split("/")).split(".json")[0];
    return { [locale]: JSON.parse(fs.readFileSync(filename, "utf8")) };
  })
  .reduce((acc, localeObj) => {
    return { ...acc, ...localeObj };
  }, {});

console.log(mergedTranslations);

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.

const defaultMessages = globSync(MESSAGES_PATTERN)
  .map(filename => fs.readFileSync(filename, "utf8"))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

console.log(defaultMessages);

// Create a new directory that we want to write the aggregate messages to
mkdirpSync(LANG_DIR);

// Merge aggregated default messages with the translated json files and
// write the messages to this directory
fs.writeFileSync(
  `${LANG_DIR}data.json`,
  JSON.stringify({ en: defaultMessages, ...mergedTranslations }, null, 2)
);