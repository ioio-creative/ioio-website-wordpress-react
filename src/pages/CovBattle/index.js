import React, { useCallback, useEffect, useState } from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { getAbsoluteUrlFromRelativeUrl } from 'utils/setStaticResourcesPath';
import { isMobileBrowser } from 'utils/getIsMobileBrowser';
import {
  linkFirebaseBattleSaveManagerToUnityAsync,
  unlinkFirebaseBattleSaveManagerToUnity
} from './multiplayer/linkFirebaseBattleSaveManagerToUnity';
import { linkFirebaseRoomSaveManagerToUnityAsync } from './multiplayer/linkFirebaseRoomSaveManagerToUnity';
import gameIcon from './images/covbattle-icon.png';
import uiWordings from './uiWordings';
import './TemplateData/style.css';
import './index.scss';

/**
 * !!!Important!!!
 * To make use the public directory path is correct, use process.env.PUBLIC_URL
 * https://create-react-app.dev/docs/using-the-public-folder
 */
const unityBuildDirPath = getAbsoluteUrlFromRelativeUrl(
  'unityBuilds/CoVBattle_test/Build/'
);
const unityBuildJsonPath = unityBuildDirPath + 'CoVBattle_test.json';
const unityLoaderPath = unityBuildDirPath + 'UnityLoader.js';

let unityContent = null;

const GameLoadProgress = ({ isShow, normedProgress }) => {
  const progressPercentStr = `${Math.ceil(normedProgress * 100)}%`;
  return (
    <div className={`loading ${isShow ? 'show' : 'hide'}`}>
      <div className='progress-container'>
        <div className='progress-text'>{progressPercentStr}</div>
        <div className='progress-msg'>
          {normedProgress > 0.85
            ? uiWordings.loadGameAboveHalf
            : uiWordings.loadGameBelowHalf}
        </div>
        <br />
        {/* https://www.w3schools.com/howto/howto_js_progressbar.asp */}
        <div id='myProgress'>
          <div id='myBar' style={{ width: progressPercentStr }} />
        </div>
      </div>
    </div>
  );
};

const UnityGame = ({
  unityContent,
  isShow,
  isShowFooter,
  handleFullScreenClicked,
  icon
}) => {
  return (
    <div className={`webgl-content ${isShow ? 'show' : 'hide'}`}>
      <div id='gameContainer'>
        <Unity unityContent={unityContent} />
      </div>
      <div className={`footer ${isShowFooter ? 'show' : 'hide'}`}>
        {/* <div className='webgl-logo' /> */}
        <div className='fullscreen' onClick={handleFullScreenClicked} />
        <div className='title'>
          <img className='game-icon' src={icon} alt='logo' />{' '}
          {uiWordings.gameTitle}
        </div>
      </div>
    </div>
  );
};

const CovBattle = _ => {
  const [isLoadGame, setIsLoadGame] = useState(false);
  const [unityLoadProgress, setUnityLoadProgress] = useState(0);

  useEffect(_ => {
    const init = async _ => {
      unityContent = null;
      if (isMobileBrowser) {
        await startLoadGameAsync();
      }
    };

    init();

    return _ => {
      if (isLoadGame) {
        unlinkFirebaseBattleSaveManagerToUnity();

        // https://github.com/elraccoone/react-unity-webgl/blob/master/source/UnityContent.ts
        unityContent.remove();
        unityContent = null;
      }
    };
  }, []);

  /* methods */

  const startLoadGameAsync = useCallback(
    async _ => {
      if (!isLoadGame) {
        setIsLoadGame(true);
        unityContent = new UnityContent(unityBuildJsonPath, unityLoaderPath);

        const unityLoadProgressPromise = _ => {
          return new Promise((res, rej) => {
            unityContent.on('progress', progression => {
              setUnityLoadProgress(progression);
              if (progression === 1) {
                res();
              }
            });
          });
        };

        await unityLoadProgressPromise();

        console.log('[CovBattle] UnityContent loaded');
        await linkFirebaseRoomSaveManagerToUnityAsync(unityContent);
        await linkFirebaseBattleSaveManagerToUnityAsync(unityContent);
      }
    },
    [isLoadGame]
  );

  /* end of methods

  /* event handlers */

  const handleFullScreenClicked = useCallback(_ => {
    // https://github.com/elraccoone/react-unity-webgl/blob/master/source/UnityContent.ts
    unityContent.setFullscreen(true);
  }, []);

  const handleLoadGameButtonClicked = startLoadGameAsync;

  /* end of event handlers */

  const isUnityLoaded = unityLoadProgress === 1;
  let isShowUnityGame = isUnityLoaded;
  const isShowUnityGameFooter = isUnityLoaded;
  let isShowGameLoadProgress = !isUnityLoaded;
  // when isMobileBrowser, allow UnityGame to show warning message
  if (isMobileBrowser) {
    isShowUnityGame = unityLoadProgress === 0 || isUnityLoaded;
    isShowGameLoadProgress = !isShowUnityGame;
  }

  return (
    <div className='cov-battle'>
      {!isLoadGame ? (
        <div className='before-game'>
          <button onClick={handleLoadGameButtonClicked}>
            {uiWordings.loadGameButton}
          </button>
        </div>
      ) : (
        <div className='game-container'>
          <UnityGame
            unityContent={unityContent}
            isShow={isShowUnityGame}
            isShowFooter={isShowUnityGameFooter}
            handleFullScreenClicked={handleFullScreenClicked}
            icon={gameIcon}
          />
          <GameLoadProgress
            isShow={isShowGameLoadProgress}
            normedProgress={unityLoadProgress}
          />
        </div>
      )}
    </div>
  );
};

export default CovBattle;
