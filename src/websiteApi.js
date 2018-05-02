import { compareForDatesAscending, compareForDatesDescending } from 'utils/datetime'

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
    sidebar: 351,
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

async function passJsonResultAsync(entityToFetch, optionalEntityId) {
    let dataUrl = baseUrl
        + entityToFetch
        + (optionalEntityId ? "/" + optionalEntityId : "")
        + defaultQuery;
    const response = await fetch(dataUrl);
    const json = await response.json();
    return json;
}

function orderProjectsByDateAscending(projects) {
    return projects.sort((project1, project2) => {
        return compareForDatesDescending(project1.project_date, project2.project_date);
    });
}

function orderProjectsByDateDescending(projects) {
    return projects.sort((project1, project2) => {
        return compareForDatesDescending(project1.project_date, project2.project_date);
    });
}


/* General */

function fetchSidebars(callback) {
    passJsonResultToCallback("sidebars", callback);
}

function fetchActiveSidebar(callback) {
    passJsonResultToCallback("sidebars", callback, activeEntities.sidebar);
}

function fetchFooters(callback) {
    passJsonResultToCallback("footers", callback);
}

function fetchActiveFooter(callback) {
    passJsonResultToCallback("footers", callback, activeEntities.footer);
}

/* end of General */
/* home page */
function fetchHighlightedProjects(callback) {
    passJsonResultToCallback("highlighted_projects", callback);
}
function fetchHomePage(callback) {
    passJsonResultToCallback("homepage", callback);
}
/* end of home page */
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
    passJsonResultToCallback("projects", (projects) => {
        callback(orderProjectsByDateDescending(projects));
    });
}



async function fetchProjectsAsync() {
    const unorderedProjects = await passJsonResultAsync("projects");
    return orderProjectsByDateDescending(unorderedProjects);
}

function fetchProjectCategories(callback) {
    passJsonResultToCallback("project_categories", callback);
}

async function fetchProjectCategoriesAsync(callback) {
    return await passJsonResultAsync("project_categories");
}

function fetchProjectTags(callback) {
    passJsonResultToCallback("project_tags", callback);
}

async function fetchProjectTagsAsync(callback) {
    return await passJsonResultAsync("project_categories");
}

/* end of project list page */


/* project detail page */

function fetchProjectById(id, callback) {
    passJsonResultToCallback("projects", callback, id);
}

/* end of project detail page */


export {
    // general
    fetchActiveSidebar,
    fetchActiveFooter,

    // home page
    fetchHomePage,
    // about page
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
    fetchHighlightedProjects,
    fetchProjectsAsync,
    fetchProjectCategories,
    fetchProjectTags,

    // project detial page
    fetchProjectById,
};
