/* 
    Notes:
    - Do not set route as "/route/:id" as id is reserved keyword in React Router
*/

const routes = {
    home: "/home",
    about: "/",
    projects: "/projects",
    projectById: "/projects/:uniqId",
    projectByIdWithValue: (id) => {
        return "/projects/" + id;
    },
    contacts: "/contacts",
}

export default routes;