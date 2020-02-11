import {useState, useEffect} from 'react';

import viewport from 'utils/ui/viewport';


// https://usehooks.com/useWindowSize/
function useViewportSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? viewport.getViewportWidth() : undefined,
      height: isClient ? viewport.getViewportHeight() : undefined
    };
  }

  const [viewportSize, setViewportSize] = useState(getSize);

  useEffect(_ => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setViewportSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return _ => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return viewportSize;
}


function useIsExtraSmallViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isExtraSmallViewport(viewportWidth);
}

function useIsSmallViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isSmallViewport(viewportWidth);
}

function useIsMediumViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isMediumViewport(viewportWidth);
}

function useIsLargeViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isLargeViewport(viewportWidth);
}

function useIsExtraLargeViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isExtraLargeViewport(viewportWidth);
}


function useIsSmallerThanOrEqualToSmallViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isSmallerThanOrEqualToSmallViewport(viewportWidth);
}

function useIsSmallerThanOrEqualToMediumViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isSmallerThanOrEqualToMediumViewport(viewportWidth);
}

function useIsSmallerThanOrEqualToLargeViewport() {
  const viewportWidth = useViewportSize().width;
  return viewport.isSmallerThanOrEqualToLargeViewport(viewportWidth);
}


export {
  useViewportSize,

  useIsExtraSmallViewport,  
  useIsSmallViewport,  
  useIsMediumViewport,  
  useIsLargeViewport,  
  useIsExtraLargeViewport,  
  
  useIsSmallerThanOrEqualToSmallViewport,  
  useIsSmallerThanOrEqualToMediumViewport,  
  useIsSmallerThanOrEqualToLargeViewport
};