import { fetchProjectsAsync } from 'websiteApi.js';

let projectIdSlugPairs = null;

function createIdSlugPairs(projectObjs) {
    let idSlugPairs = {};
    projectObjs.forEach((projectObj) => {
        idSlugPairs[projectObj.id] = projectObj.slug;
    });
    return idSlugPairs;
}

async function getProjectIdSlugPairs() {
    if (projectIdSlugPairs === null) {
        const projectObjs = await fetchProjectsAsync();
        projectIdSlugPairs = createIdSlugPairs(projectObjs);
    }
    return projectIdSlugPairs;
}

async function getProjectSlugByIdAsync(projectSlug) {
    if (projectIdSlugPairs === null) {
        const projectObjs = await fetchProjectsAsync();
        projectIdSlugPairs = createIdSlugPairs(projectObjs);
    }
    return projectIdSlugPairs[projectSlug];
}

export {
    getProjectIdSlugPairs,
    getProjectSlugByIdAsync
};
