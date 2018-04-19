let projectCategoryIdNamePairs = null;
let projectTagIdNamePairs = null;

function createIdNamePairs(sourceObjs) {
    let idNamePairs = {};
    sourceObjs.forEach((sourceObj) => {
        idNamePairs[sourceObj.id] = sourceObj.name;
    });
    return idNamePairs;
}

function getProjectCategoryNameById(categoryId, categoryObjs) {
    // TODO: Should we include this check null?
    // This may prevent the latest update from CMS to be shown in app
    // if the user does not refresh the page???
    if (projectCategoryIdNamePairs === null) {
        projectCategoryIdNamePairs = createIdNamePairs(categoryObjs);
    }
    return projectCategoryIdNamePairs[categoryId];
}

function getProjectTagNameById(tagId, tagObjs) {
    // TODO: Should we include this check null?
    // This may prevent the latest update from CMS to be shown in app
    // if the user does not refresh the page???
    if (projectTagIdNamePairs === null) {
        projectTagIdNamePairs = createIdNamePairs(tagObjs);
    }
    return projectTagIdNamePairs[tagId];
}

export {
    getProjectCategoryNameById,
    getProjectTagNameById
};