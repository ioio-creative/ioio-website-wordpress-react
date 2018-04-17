let productCategoryIdNamePairs = null;
let productTagIdNamePairs = null;

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
    if (productCategoryIdNamePairs === null) {
        productCategoryIdNamePairs = createIdNamePairs(categoryObjs);
    }
    return productCategoryIdNamePairs[categoryId];
}

function getProjectTagNameById(tagId, tagObjs) {
    // TODO: Should we include this check null?
    // This may prevent the latest update from CMS to be shown in app
    // if the user does not refresh the page???
    if (productTagIdNamePairs === null) {
        productTagIdNamePairs = createIdNamePairs(tagObjs);
    }
    return productTagIdNamePairs[tagId];
}

export {
    getProjectCategoryNameById,
    getProjectTagNameById
};