import { fetchLabDetailPages, fetchLabDetailPagesAsync } from 'websiteApi.js';
import { createSlugIdPairs } from 'utils/generalMapper.js'

let labDetailPageSlugIdPairs = null;

function getLabDetailPageSlugIdPairs(callback) {
  if (labDetailPageSlugIdPairs === null) {
    fetchLabDetailPages((labs) => {
      labDetailPageSlugIdPairs = createSlugIdPairs(labs);
      callback(labDetailPageSlugIdPairs);
    });
  } else {
    callback(labDetailPageSlugIdPairs);
  }
}

async function getLabDetailPageSlugIdPairsAsync() {
  if (labDetailPageSlugIdPairs === null) {
    const labObjs = await fetchLabDetailPagesAsync();
    labDetailPageSlugIdPairs = createSlugIdPairs(labObjs);
  }
  return labDetailPageSlugIdPairs;
}

async function getLabDetailPageIdBySlugAsync(labSlug) {
  return (await getLabDetailPageSlugIdPairsAsync())[labSlug];
}

export {
  getLabDetailPageSlugIdPairs,
  getLabDetailPageSlugIdPairsAsync,
  getLabDetailPageIdBySlugAsync
};
