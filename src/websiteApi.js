/*
    WordPress API References
    - https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/#_embed
*/

const baseUrl = "http://13.228.34.232/wp-json/wp/v2/";
//const defaultQuery = "?_embed";
const defaultQuery = "";

// container of WordPress generated id's of active entities,
// used for fetching entity by id via WordPress API
const activeEntities = {
    about: 72,
    footer: 263,
};


function passJsonResultToCallback(entityToFetch, callback, optionalEntityId) {
    let dataUrl = baseUrl
        + entityToFetch
        + (optionalEntityId ? "/" + optionalEntityId : "")
        + defaultQuery;
    fetch(dataUrl)
        .then(res => res.json())
        .then(resJson => {
            if (resJson.data && resJson.data.status === 404) {
                // 404 not found
                callback(null);
            } else {
                callback(resJson);
            }
        });
}


/* General */

function fetchFooter(callback) {
    passJsonResultToCallback("footers", callback);
}

function fetchActiveFooter(callback) {
    passJsonResultToCallback("footers", callback, activeEntities.footer);
}

/* end of General */


/* about page */

function fetchAbouts(callback) {
    passJsonResultToCallback("abouts", callback);
}

function fetchAboutById(id, callback) {
    passJsonResultToCallback("abouts", callback, id);
}

function fetchActiveAbout(callback) {
    passJsonResultToCallback("abouts", callback, activeEntities.about);
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
    // general
    fetchFooter,
    fetchActiveFooter,

    // about page    
    fetchAbouts,
    fetchAboutById,
    fetchActiveAbout,
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
    fetchProjectById,
};
