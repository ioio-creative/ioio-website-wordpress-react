import { fetchProjectCategories, fetchProjectCategoriesAsync, fetchProjectTags, fetchProjectTagsAsync } from 'websiteApi.js';
import { createIdNamePairs } from 'utils/generalMapper.js'


/* project category */

let projectCategories = null;
let projectCategoryIdNamePairs = null;

function getProjectCategoriesAndItsIdNamePairs(callback) {
  if (projectCategories === null || projectCategoryIdNamePairs === null) {
    fetchProjectCategories((projCategories) => {
      projectCategories = projCategories;      
      projectCategoryIdNamePairs = createIdNamePairs(projCategories);
      callback(projectCategories, projectCategoryIdNamePairs);
    });    
  } else {
    callback(projectCategories, projectCategoryIdNamePairs);
  }
}

async function getProjectCategoriesAndItsIdNamePairsAsync() {
  if (projectCategories === null || projectCategoryIdNamePairs === null) {
    projectCategories = await fetchProjectCategoriesAsync();
    projectCategoryIdNamePairs = createIdNamePairs(projectCategories);
  }
  return {
    projectCategories: projectCategories,
    projectCategoryIdNamePairs: projectCategoryIdNamePairs
  };
}

async function getProjectCategoryNameByIdAsync(categoryId) {  
  return (await getProjectCategoriesAndItsIdNamePairsAsync()).projectCategoryIdNamePairs[categoryId];
}

/* end of project category */


/* project tag */

let projectTags = null;
let projectTagIdNamePairs = null;

function getProjectTagsAndItsProjectTagIdNamePairs(callback) {
  if (projectTagIdNamePairs === null) {
    fetchProjectTags((projTags) => {
      projectTags = projTags;
      projectTagIdNamePairs = createIdNamePairs(projTags);
      callback(projectTags, projectTagIdNamePairs);
    });    
  } else {
    callback(projectTags, projectTagIdNamePairs);
  }
}

async function getProjectTagsAndItsProjectTagIdNamePairsAsync() {
  if (projectTagIdNamePairs === null) {
    projectTags = await fetchProjectTagsAsync();
    projectTagIdNamePairs = createIdNamePairs(projectTags);
  }
  return {
    projectTags: projectTags,
    projectTagIdNamePairs: projectTagIdNamePairs
  }
}

async function getProjectTagNameByIdAsync(tagId) {   
  return (await getProjectTagsAndItsProjectTagIdNamePairsAsync()).projectTagIdNamePairs[tagId];
}

/* end of project tag */


export {
  // project category
  getProjectCategoriesAndItsIdNamePairs,
  getProjectCategoriesAndItsIdNamePairsAsync,
  getProjectCategoryNameByIdAsync,

  // project tag
  getProjectTagsAndItsProjectTagIdNamePairs,
  getProjectTagsAndItsProjectTagIdNamePairsAsync,
  getProjectTagNameByIdAsync
};