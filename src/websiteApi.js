import { globalLanguage } from 'App';
import { languages } from 'globals/config';
import {
  compareForDatesAscending,
  compareForDatesDescending
} from 'utils/datetime';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

/*
  WordPress API References
  - https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/#_embed
*/

//const baseUrl = "http://13.228.34.232/wp-json/wp/v2/";
/*
  !!! Important !!!
  To avoid "Blocked loading mixed active content" error,
  we have to use HTTPS.
*/
const baseUrl = 'https://wordpress.ioiocreative.com/wp-json/wp/v2/';
//const defaultQuery = "?_embed";
// const defaultQuery = "?per_page=20";
const defaultQuery = '?per_page=100';

// container of WordPress generated id's of active entities,
// used for fetching entity by id via WordPress API
const activeEntities = {
  homepage: 637,
  about: 72,
  aboutLab: 1480,
  brightFooter: 263,
  darkFooter: 1518,
  brightSidebar: 351,
  darkSidebar: 1424,
  contact: 1008,
  lab: 1348,
  allAddressList: 2859
};

function constructDataUrl(entityToFetch, optionalEntityId, optionalQuery) {
  /*
    Somehow, CMS server may redirect when there is query string "lang=en" in the API request,
    causing CORS error. So I ignore the language query string 
    when (globalLanguage.code === languages.english.code)
  */
  const customQuery =
    (optionalQuery ? defaultQuery + '&' + optionalQuery : defaultQuery) +
    (globalLanguage.code === languages.english.code
      ? ''
      : '&lang=' + globalLanguage.code);
  return (
    baseUrl +
    entityToFetch +
    (optionalEntityId ? '/' + optionalEntityId : '') +
    customQuery
  );
}

function passJsonResultToCallback(
  entityToFetch,
  callback,
  optionalEntityId,
  optionalQuery
) {
  const dataUrl = constructDataUrl(
    entityToFetch,
    optionalEntityId,
    optionalQuery
  );
  fetch(dataUrl)
    .then(res => res.json())
    .then(resJson => {
      if (resJson.data && resJson.data.status === 404) {
        console.log(`Fetching ${dataUrl} :`);
        console.log('Status:', resJson.data.status);
        // 404 not found
        callback(null);
      } else {
        callback(resJson);
      }
    })
    .catch(err => {
      console.error(`Error when fetching ${dataUrl} :`);
      console.error(err);
      callback(null);
    });
}

async function passJsonResultAsync(
  entityToFetch,
  optionalEntityId,
  optionalQuery
) {
  const dataUrl = constructDataUrl(
    entityToFetch,
    optionalEntityId,
    optionalQuery
  );
  const response = await fetch(dataUrl);
  const json = await response.json();
  return json;
}

function orderProjectsByDateAscending(projects) {
  if (!isNonEmptyArray(projects)) {
    return [];
  }
  return projects.sort((project1, project2) => {
    return compareForDatesAscending(
      project1.project_date,
      project2.project_date
    );
  });
}

function orderProjectsByDateDescending(projects) {
  if (!isNonEmptyArray(projects)) {
    return [];
  }
  return projects.sort((project1, project2) => {
    return compareForDatesDescending(
      project1.project_date,
      project2.project_date
    );
  });
}

/* General */

function fetchAllAddressList(callback) {
  passJsonResultToCallback(
    'address_lists',
    callback,
    activeEntities.allAddressList
  );
}

function fetchBrightSidebar(callback) {
  passJsonResultToCallback('sidebars', callback);
}

function fetchActiveBrightSidebar(callback) {
  passJsonResultToCallback('sidebars', callback, activeEntities.brightSidebar);
}

function fetchDarkSidebar(callback) {
  passJsonResultToCallback('sidebars', callback);
}

function fetchActiveDarkSidebar(callback) {
  passJsonResultToCallback('sidebars', callback, activeEntities.darkSidebar);
}

function fetchFooters(callback) {
  passJsonResultToCallback('footers', callback);
}

function fetchActiveBrightFooter(callback) {
  passJsonResultToCallback('footers', callback, activeEntities.brightFooter);
}

function fetchActiveDarkFooter(callback) {
  passJsonResultToCallback('footers', callback, activeEntities.darkFooter);
}

/* end of General */

/* home page */

function fetchHomePages(callback) {
  passJsonResultToCallback('homepage', callback);
}

function fetchActiveHomePage(callback) {
  passJsonResultToCallback('homepage', callback, activeEntities.homepage);
}

/* end of home page */

/* about page */

function fetchAbouts(callback) {
  passJsonResultToCallback('abouts', callback);
}

function fetchAboutById(id, callback) {
  passJsonResultToCallback('abouts', callback, id);
}

function fetchActiveAbout(callback) {
  passJsonResultToCallback('abouts', callback, activeEntities.about);
}

function fetchActiveAboutLab(callback) {
  passJsonResultToCallback('abouts', callback, activeEntities.aboutLab);
}

function fetchCompanyDnas(callback) {
  passJsonResultToCallback('company_dnas', callback);
}

function fetchCompanyCultures(callback) {
  passJsonResultToCallback('company_cultures', callback);
}

function fetchTeamMembers(callback) {
  passJsonResultToCallback('team_members', callback);
}

function fetchCompanyServices(callback) {
  passJsonResultToCallback('company_services', callback);
}

function fetchCompanyClients(callback) {
  passJsonResultToCallback('company_clients', callback);
}

function fetchPressReleases(callback) {
  passJsonResultToCallback('press_releases', callback);
}

function fetchCompanies(callback) {
  passJsonResultToCallback('companies', callback);
}

/* end of about page */

/* project list page */

function fetchProjects(callback) {
  passJsonResultToCallback('projects', projects => {
    callback(orderProjectsByDateDescending(projects));
  });
}

async function fetchProjectsAsync() {
  const unorderedProjects = await passJsonResultAsync('projects');
  return orderProjectsByDateDescending(unorderedProjects);
}

/**
 *
 * wp api:  /projects_list
 * - project limit
 * - functions.php:6083
 */

function fetchProjectListOrderByProjectDateAsc(callback) {
  passJsonResultToCallback(
    'projects_list',
    projects => {
      callback(projects);
    },
    null,
    'orderby=project_date&order=asc'
  );
}

async function fetchProjectListOrderByProjectDateAscAsync(callback) {
  return await passJsonResultAsync(
    'projects_list',
    null,
    'orderby=project_date&order=asc'
  );
}

function fetchProjectListOrderByProjectDateDesc(callback) {
  passJsonResultToCallback(
    'projects_list',
    projects => {
      callback(projects);
    },
    null,
    'orderby=project_date&order=desc'
  );
}

async function fetchProjectListOrderByProjectDateDescAsync(callback) {
  return await passJsonResultAsync(
    'projects_list',
    null,
    'orderby=project_date&order=desc'
  );
}

function fetchProjectCategories(callback) {
  passJsonResultToCallback('project_categories', callback);
}

async function fetchProjectCategoriesAsync() {
  return await passJsonResultAsync('project_categories');
}

function fetchProjectTags(callback) {
  passJsonResultToCallback('project_tags', callback);
}

async function fetchProjectTagsAsync() {
  return await passJsonResultAsync('project_categories');
}

/* end of project list page */

/* project detail page */

function fetchProjectById(id, callback) {
  passJsonResultToCallback('projects', callback, id);
}

async function fetchProjectByIdAsync(id) {
  return await passJsonResultAsync('projects', id);
}

function fetchProjectWithNextIdById(id, callback) {
  passJsonResultToCallback('projects_with_next_id', callback, id);
}

async function fetchProjectWithNextIdByIdAsync(id) {
  return await passJsonResultAsync('projects_with_next_id', id);
}

/* end of project detail page */

/* project contact page */
function fetchActiveContact(callback) {
  passJsonResultToCallback('contact', callback, activeEntities.contact);
}

function fetchContact(callback) {
  passJsonResultToCallback('contact', callback);
}
/* end of contact detail page */

/* lab page */

function fetchActiveLab(callback) {
  passJsonResultToCallback('lab', callback, activeEntities.lab);
}

function fetchLab(callback) {
  passJsonResultToCallback('lab', callback);
}

function fetchLabItems(callback) {
  passJsonResultToCallback('lab_items', callback);
}

function fetchLabCategories(callback) {
  passJsonResultToCallback('lab_categories', callback);
}

/* end of lab page */

/* lab detail page */

async function fetchLabDetailPagesAsync() {
  return await passJsonResultAsync('lab_detail_pages');
}

function fetchLabDetailPages(callback) {
  passJsonResultToCallback('lab_detail_pages', callback);
}

function fetchLabDetailPageById(id, callback) {
  passJsonResultToCallback('lab_detail_pages', callback, id);
}

/* end of lab detail page */

export {
  // general
  fetchAllAddressList,
  fetchBrightSidebar,
  fetchActiveBrightSidebar,
  fetchDarkSidebar,
  fetchActiveDarkSidebar,
  fetchActiveBrightFooter,
  fetchActiveDarkFooter,
  // home page
  fetchHomePages,
  fetchActiveHomePage,
  // about page
  fetchActiveAbout,
  fetchActiveAboutLab,
  fetchCompanyDnas,
  fetchCompanyCultures,
  fetchTeamMembers,
  fetchCompanyServices,
  fetchCompanyClients,
  fetchPressReleases,
  fetchCompanies,
  // project list page
  fetchProjects,
  fetchProjectsAsync,
  fetchProjectListOrderByProjectDateAsc,
  fetchProjectListOrderByProjectDateAscAsync,
  fetchProjectListOrderByProjectDateDesc,
  fetchProjectListOrderByProjectDateDescAsync,
  fetchProjectCategories,
  fetchProjectCategoriesAsync,
  fetchProjectTags,
  fetchProjectTagsAsync,
  // project detail page
  fetchProjectById,
  fetchProjectByIdAsync,
  // project detail page with next id
  fetchProjectWithNextIdById,
  fetchProjectWithNextIdByIdAsync,
  // contact page
  fetchActiveContact,
  fetchContact,
  // lab page
  fetchActiveLab,
  fetchLab,
  fetchLabItems,
  fetchLabCategories,
  // lab detail page
  fetchLabDetailPagesAsync,
  fetchLabDetailPages,
  fetchLabDetailPageById
};
