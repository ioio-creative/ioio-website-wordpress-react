const baseUrl = "http://13.228.34.232/wp-json/wp/v2/";
const defaultQuery = "?_embed";


function passJsonResultToCallback(entityToFetch, callback, optionalEntityId) {
    let dataUrl = baseUrl 
        + entityToFetch 
        + (optionalEntityId ? "/" + optionalEntityId : "") 
        + defaultQuery;
    fetch(dataUrl)
        .then(res => res.json())
        .then(resJson => {
            callback(resJson);
        });
}

//Chris: do you think we should simpify this?
/* General */

function fetchFooter(callback) {
    passJsonResultToCallback("footer", callback);
}

/* end of General */

/* about page */

function fetchAbouts(callback) {
    passJsonResultToCallback("abouts", callback);
}

function fetchCompanyDnas(callback) {
    passJsonResultToCallback("company_dnas", callback);
}

function fetchCompanyCultures(callback) {
    passJsonResultToCallback("company_cultures", callback);
}

function fetchTeamMembers(callback) {
    passJsonResultToCallback("team_members", callback);
}

function fetchCompanyServices(callback) {
    passJsonResultToCallback("company_services", callback);
}

function fetchCompanyClients(callback) {
    passJsonResultToCallback("company_clients", callback);
}

function fetchPressReleases(callback) {
    passJsonResultToCallback("press_releases", callback);
}

function fetchCompanies(callback) {
    passJsonResultToCallback("companies", callback);
}



/* end of about page */


/* project list page */

function fetchProjects(callback) {
    passJsonResultToCallback("projects", callback);
}

function fetchProjectCategories(callback) {
    passJsonResultToCallback("project_categories", callback);
}

function fetchProjectTags(callback) {
    passJsonResultToCallback("project_tags", callback);
}

/* end of project list page */


/* project detail page */

function fetchProjectById(id, callback) {
    passJsonResultToCallback("projects", callback, id);
}

/* end of project detail page */


export {
    fetchFooter,
    
    // about page
    fetchAbouts,
    fetchCompanyDnas,
    fetchCompanyCultures,
    fetchTeamMembers,
    fetchCompanyServices,
    fetchCompanyClients,
    fetchPressReleases,
    fetchCompanies,

    // project list page
    fetchProjects,
    fetchProjectCategories,
    fetchProjectTags,

    // project detial page
    fetchProjectById
};
