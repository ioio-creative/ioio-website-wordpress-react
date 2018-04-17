let productCategoryIdNamePairs = null;
let productTagIdNamePairs = null;

function createIdNamePairs(sourceObjs) {
    let idNamePairs = {};
    sourceObjs.forEach((targetObj) => {
        idNamePairs[targetObj.id] = targetObj.name;
    });
    return idNamePairs;
}

function getProjectCategoryNameById(categoryId, categoryObjs) {
    if (productCategoryIdNamePairs === null) {
        productCategoryIdNamePairs = createIdNamePairs(categoryObjs);
    }
    return productCategoryIdNamePairs[categoryId];
}

function getProjectTagNameById(tagId, tagObjs) {
    if (productTagIdNamePairs === null) {
        productTagIdNamePairs = createIdNamePairs(tagObjs);
    }
    return productTagIdNamePairs[tagId];
}

export {
    getProjectCategoryNameById,
    getProjectTagNameById
};