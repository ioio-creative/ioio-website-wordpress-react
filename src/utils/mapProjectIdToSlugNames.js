import { fetchProjects, fetchProjectsAsync } from 'websiteApi.js';
import { createIdSlugPairs } from 'utils/generalMapper.js'

let projectIdSlugPairs = null;

function getProjectIdSlugPairs(callback) {
  if (projectIdSlugPairs === null) {
    fetchProjects((projects) => {
      projectIdSlugPairs = createIdSlugPairs(projects);
      callback(projectIdSlugPairs);
    });    
  } else {
    callback(projectIdSlugPairs);
  } 
}

async function getProjectIdSlugPairsAsync() {
  if (projectIdSlugPairs === null) {
    const projectObjs = await fetchProjectsAsync();
    projectIdSlugPairs = createIdSlugPairs(projectObjs);
  }
  return projectIdSlugPairs;
}

async function getProjectSlugByIdAsync(projectSlug) {    
  return (await getProjectIdSlugPairsAsync())[projectSlug];
}

export {
  getProjectIdSlugPairs,
  getProjectIdSlugPairsAsync,
  getProjectSlugByIdAsync
};
