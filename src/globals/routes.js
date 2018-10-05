/*
    Notes:
    - Do not set route as "/route/:id" as id is reserved keyword in React Router
    - Do not use lambda expression to define function as routes's members. Somehow 'this' keyword won't work if lambda was used instead of 'function'.
*/

export default {
  home: "/",
  about: "/about",
  projects: "/projects",
  projectsAll: function () {
    return this.projectsByCategory('all');
  },
  projectsByCategory: function (categorySlug) {
    return "/projects?category=" + categorySlug;
  },
  projectBySlug: "/projects/:projectSlug",
  projectBySlugWithValue: (slugValue) => {
    return "/projects/" + slugValue;
  },
  lab: "/lab",
  labAll: function () {
    return this.labByCategory('all');
  },
  labByCategory: function (categorySlug) {
    return "/lab?category=" + categorySlug;
  },
  labAbout: "/lab/about",
  labContacts: "/lab/contacts",
  labBySlug: "/lab/labs/:labSlug",
  labBySlugWithValue: (slugValue) => {
    return "/lab/" + slugValue;
  },
  contacts: "/contacts",
  notFound: "/notfound",
  tapping: "/tapping",
  hopping: "/hopping"
};
