import { fetchProjectCategories, fetchProjectCategoriesAsync } from 'websiteApi.js'; 
import { createSlugIdPairs } from 'utils/generalMapper.js'

let projectCategorySlugIdPairs = null;

function getProjectCategorySlugIdPairs(callback) {
  if (projectCategorySlugIdPairs === null) {
    fetchProjectCategories((projectCategories) => {
      projectCategorySlugIdPairs = createSlugIdPairs(projectCategories);
      callback(projectCategorySlugIdPairs);
    });     
  } else {
    callback(projectCategorySlugIdPairs);
  }
}

async function getProjectCategorySlugIdPairsAsync() {
  if (projectCategorySlugIdPairs === null) {
    const projectCategoryObjs = await fetchProjectCategoriesAsync(); 
    projectCategorySlugIdPairs = createSlugIdPairs(projectCategoryObjs); 
  }
  return projectCategorySlugIdPairs;
}

async function getProjectIdBySlugAsync(projectCategorySlug) {
  return (await getProjectSlugIdPairsAsync())[projectCategorySlug]; 
}

export {
  getProjectCategorySlugIdPairs,
  getProjectCategorySlugIdPairsAsync,
  getProjectIdBySlugAsync
}; 