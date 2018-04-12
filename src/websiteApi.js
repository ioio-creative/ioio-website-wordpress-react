const baseUrl = "http://13.228.34.232/wp-json/wp/v2/";
const defaultQuery = "?_embed";


function passJsonResultToCallback(entityToFetch, callback) {
    let dataUrl = baseUrl + entityToFetch + defaultQuery;
    fetch(dataUrl)
        .then(res => res.json())
        .then(resJson => {
            callback(resJson);
        });
}


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


export {
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
};
