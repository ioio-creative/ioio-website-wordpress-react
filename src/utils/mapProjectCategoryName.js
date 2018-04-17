let productCategoryIdNamePairs = null;

function fillProductCategoryIdNamePairs(categoryObjs) {
    idNamePairs = {};
    categoryObjs.forEach((categoryObj) => {
        idNamePairs[categoryObj.id] = categoryObj.name;
    });
    productCategoryIdNamePairs = idNamePairs;
}

function getProjectCategoryName(categoryId, categoryObjs) {
    if (projectCategories === null) {
        fillProductCategoryIdNamePairs(categoryObjs);
    }
    return productCategoryIdNamePairs[categoryId];
}

export {
    getProjectCategoryName,
};