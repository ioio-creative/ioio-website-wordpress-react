/*
    Notes:
    - Do not set route as "/route/:id" as id is reserved keyword in React Router
*/

const routes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  projectsByCategory: (categorySlug) => {
    return "/projects?category=" + categorySlug;
  },
  projectBySlug: "/projects/:projectSlug",
  projectBySlugWithValue: (slugValue) => {
    return "/projects/" + slugValue;
  },
  lab: "/lab",
  labBySlug: "/lab/:labSlug",
  labBySlugWithValue: (slugValue) => {
    return "/lab/" + slugValue;
  },
  contacts: "/contacts",
  notFound: "/notfound"
}

export default routes;
