import { fetchProjects } from 'websiteApi.js';

let projectSlugIdPairs = null;

fetchProjects((projects) => {
    projectSlugIdPairs = projectSlugIdPairs(projects);
});

function createSlugIdPairs(projectObjs) {
    let slugIdPairs = {};
    projectObjs.forEach((projectObj) => {
        slugIdPairs[projectObj.slug] = projectObj.id;
    });
    return slugIdPairs;
}

function getProjectIdBySlug(projectSlug) {
    if (projectSlugIdPairs === null) {
        return null
    }
    return projectSlugIdPairs[projectSlug];
}

export {
    getProjectIdBySlug
};