/* 
    Notes:
    - Do not set route as "/route/:id" as id is reserved keyword in React Router
*/

const routes = {
    home: "/home",
    about: "/",
    projects: "/projects",
    projectBySlug: "/projects/:projectSlug",
    projectBySlugWithValue: (slugValue) => {
        return "/projects/" + slugValue;
    },
    contacts: "/contacts",
}

export default routes;