// https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

// https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
function isInViewport (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= getViewportWidth() &&
      bounding.right <= getViewportHeight()
  );
};


// https://getbootstrap.com/docs/4.1/layout/overview/
function isExtraSmallViewport(viewportWidth = getViewportWidth()) {
  return viewportWidth < 576;
}

function isSmallViewport(viewportWidth = getViewportWidth()) {
  return viewportWidth < 768 && !isExtraSmallViewport(viewportWidth);
}

function isMediumViewport(viewportWidth = getViewportWidth()) {
  return viewportWidth < 992 && !isSmallerThanOrEqualToSmallViewport(viewportWidth);
}

function isLargeViewport(viewportWidth = getViewportWidth()) {
  return viewportWidth < 1200 && !isSmallerThanOrEqualToMediumViewport(viewportWidth);
}

function isExtraLargeViewport(viewportWidth = getViewportWidth()) {
  return !isLargeViewport(viewportWidth) && !isSmallerThanOrEqualToLargeViewport(viewportWidth);
}


function isSmallerThanOrEqualToSmallViewport(viewportWidth = getViewportWidth()) {
  return isSmallViewport(viewportWidth) || isExtraSmallViewport(viewportWidth);
}

function isSmallerThanOrEqualToMediumViewport(viewportWidth = getViewportWidth()) {
  return isMediumViewport(viewportWidth) || isSmallerThanOrEqualToSmallViewport(viewportWidth);
}

function isSmallerThanOrEqualToLargeViewport(viewportWidth = getViewportWidth()) {
  return isLargeViewport(viewportWidth) || isSmallerThanOrEqualToMediumViewport(viewportWidth);
}


const myViewport = {
  getViewportWidth,
  getViewportHeight,
  isInViewport,

  isExtraSmallViewport,
  isSmallViewport,
  isMediumViewport,
  isLargeViewport,
  isExtraLargeViewport,

  isSmallerThanOrEqualToSmallViewport,
  isSmallerThanOrEqualToMediumViewport,
  isSmallerThanOrEqualToLargeViewport,
};

export default myViewport;