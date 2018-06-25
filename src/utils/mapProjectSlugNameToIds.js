import { fetchProjects, fetchProjectsAsync } from 'websiteApi.js'; 
import { createSlugIdPairs } from 'utils/generalMapper.js'

let projectSlugIdPairs = null;

function getProjectSlugIdPairs(callback) {
  if (projectSlugIdPairs === null) {
    fetchProjects((projects) => {
      projectSlugIdPairs = createSlugIdPairs(projects);
      callback(projectSlugIdPairs);
    });     
  } else {
    callback(projectSlugIdPairs);
  }
}

async function getProjectSlugIdPairsAsync() {
  if (projectSlugIdPairs === null) {
    const projectObjs = await fetchProjectsAsync(); 
    projectSlugIdPairs = createSlugIdPairs(projectObjs); 
  }
  return projectSlugIdPairs;
}

async function getProjectIdBySlugAsync(projectSlug) {
  return (await getProjectSlugIdPairsAsync())[projectSlug]; 
}

export {
  getProjectSlugIdPairs,
  getProjectSlugIdPairsAsync,
  getProjectIdBySlugAsync
};