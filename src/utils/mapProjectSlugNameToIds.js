import { fetchProjectsAsync } from 'websiteApi.js';

let projectSlugIdPairs = null;

function createSlugIdPairs(projectObjs) {
    let slugIdPairs = {};
    projectObjs.forEach((projectObj) => {
        slugIdPairs[projectObj.slug] = projectObj.id;
    });
    return slugIdPairs;
}

async function getProjectIdBySlugAsync(projectSlug) {
    if (projectSlugIdPairs === null) {
        const projectObjs = await fetchProjectsAsync();
        projectSlugIdPairs = createSlugIdPairs(projectObjs);
    }    
    return projectSlugIdPairs[projectSlug];
}

export {
    getProjectIdBySlugAsync
};