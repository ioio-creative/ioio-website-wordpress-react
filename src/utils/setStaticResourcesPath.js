let publicUrl = process.env.PUBLIC_URL;

if (publicUrl !== null || publicUrl !== undefined || publicUrl !== '') {
  if (publicUrl[publicUrl.length - 1] === '/') {
    publicUrl = publicUrl.substr(0, publicUrl.length - 1);
  }
}

function getAbsoluteUrlFromRelativeUrl(relativeUrl) {
  if (relativeUrl !== null || relativeUrl !== undefined || relativeUrl !== '') {
    if (relativeUrl[0] === '/') {
      if (relativeUrl.length === 1) {
        relativeUrl = '';
      } else {
        relativeUrl = relativeUrl.substr(1);
      }
    }
  }
  return publicUrl + '/' + relativeUrl;
}

function getAbsoluteUrlsFromRelativeUrls(relativeUrls) {
  return relativeUrls.map(getAbsoluteUrlFromRelativeUrl);
}

export {
  getAbsoluteUrlFromRelativeUrl,
  getAbsoluteUrlsFromRelativeUrls
}