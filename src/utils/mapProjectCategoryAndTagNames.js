import { fetchProjectCategories, fetchProjectTags } from 'websiteApi.js';

let projectCategoryIdNamePairs = null;
let projectTagIdNamePairs = null;

fetchProjectCategories((categoryObjs) => {
    projectCategoryIdNamePairs = createIdNamePairs(categoryObjs);
});

fetchProjectTags((tagObjs) => {
    projectTagIdNamePairs = createIdNamePairs(tagObjs);
});

function createIdNamePairs(sourceObjs) {
    let idNamePairs = {};
    sourceObjs.forEach((sourceObj) => {
        idNamePairs[sourceObj.id] = sourceObj.name;
    });
    return idNamePairs;
}

function getProjectCategoryNameById(categoryId) {
    if (projectCategoryIdNamePairs === null) {
        return null;
    }
    return projectCategoryIdNamePairs[categoryId];
}

function getProjectTagNameById(tagId) {
    if (projectTagIdNamePairs === null) {
        return null;
    }
    return projectTagIdNamePairs[tagId];
}

export {
    getProjectCategoryNameById,
    getProjectTagNameById
};