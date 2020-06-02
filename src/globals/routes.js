import { globalLanguage } from 'App';

/*
    Notes:
    - Do not set route as "/route/:id" as id is reserved keyword in React Router
    - Do not use lambda expression to define function as routes's members. Somehow 'this' keyword won't work if lambda was used instead of 'function'.
*/

function langQuery(langCode) {
  return 'lang=' + langCode;
}

function addLangQueryIfIsLink(isLink) {
  return isLink ? '?' + langQuery(globalLanguage.code) : '';
}

export default {
  home: function (isLink) {
    return '/' + addLangQueryIfIsLink(isLink);
  },
  about: function (isLink) {
    return '/about' + addLangQueryIfIsLink(isLink);
  },
  projects: function (isLink) {
    return '/projects' + addLangQueryIfIsLink(isLink);
  },
  projectsAll: function () {
    return this.projectsByCategory('all');
  },
  projectsByCategory: function (categorySlug) {
    return (
      '/projects?category=' +
      categorySlug +
      '&' +
      langQuery(globalLanguage.code)
    );
  },
  projectBySlug: '/projects/:projectSlug',
  projectBySlugWithValue: function (slugValue) {
    return '/projects/' + slugValue + '?' + langQuery(globalLanguage.code);
  },
  lab: function (isLink) {
    return '/lab' + addLangQueryIfIsLink(isLink);
  },
  labAll: function () {
    return this.labByCategory('all');
  },
  labByCategory: function (categorySlug) {
    return '/lab?category=' + categorySlug;
  },
  labAbout: function (isLink) {
    return '/lab/about' + addLangQueryIfIsLink(isLink);
  },
  labContacts: function (isLink) {
    return '/lab/contacts' + addLangQueryIfIsLink(isLink);
  },
  labBySlug: '/lab/labs/:labSlug',
  labBySlugWithValue: function (slugValue) {
    return '/lab/' + slugValue + '?' + langQuery(globalLanguage.code);
  },
  contacts: function (isLink) {
    return '/contacts' + addLangQueryIfIsLink(isLink);
  },
  // notFound: '/notfound',
  notFound: function (isLink) {
    return '/notfound' + addLangQueryIfIsLink(isLink);
  },
  tapping: '/tapping',
  hopping: '/hopping',
  sonar2019: '/polarpolar',
  schoolVR: '/schoolVR',
  winningTheFlu: function (isLink) {
    return '/winningTheFlu' + addLangQueryIfIsLink(isLink);
  }
};
