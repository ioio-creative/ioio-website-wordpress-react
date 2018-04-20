/*
    Notes:
    - Do not set route as "/route/:id" as id is reserved keyword in React Router
*/

const routes = {
    home: "/",
    about: "/about",
    projects: "/projects",
    projectBySlug: "/projects/:projectSlug",
    projectBySlugWithValue: (slugValue) => {
        return "/projects/" + slugValue;
    },
    contacts: "/contacts",
    notFound: "/notfound"
}

export default routes;
