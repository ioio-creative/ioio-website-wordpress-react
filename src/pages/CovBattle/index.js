import React, { useCallback, useEffect, useState } from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { getAbsoluteUrlFromRelativeUrl } from 'utils/setStaticResourcesPath';
import {
  linkFirebaseBattleSaveManagerToUnityAsync,
  unlinkFirebaseBattleSaveManagerToUnity
} from './multiplayer/linkFirebaseBattleSaveManagerToUnity';
import { linkFirebaseRoomSaveManagerToUnityAsync } from './multiplayer/linkFirebaseRoomSaveManagerToUnity';
import gameIcon from './images/covbattle-icon.png';
import './TemplateData/style.css';
import './index.css';

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

const uiWordings = {
  gameTitle: 'Winning the Flu 14日後',
  loadGameButton: 'Load Game!'
};

const CovBattle = _ => {
  const [isLoadGame, setIsLoadGame] = useState(false);
  const [unityLoadProgress, setUnityLoadProgress] = useState(0);

  useEffect(_ => {
    unityContent = null;
    return _ => {
      if (isLoadGame) {
        unlinkFirebaseBattleSaveManagerToUnity();

        // https://github.com/elraccoone/react-unity-webgl/blob/master/source/UnityContent.ts
        unityContent.remove();
        unityContent = null;
      }
    };
  }, []);

  const handleFullScreenClicked = useCallback(_ => {
    // https://github.com/elraccoone/react-unity-webgl/blob/master/source/UnityContent.ts
    unityContent.setFullscreen(true);
  }, []);

  const handleLoadGameButtonClicked = useCallback(
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

  const isUnityLoaded = unityLoadProgress === 1;
  const unityLoadProgressPercentStr = `${Math.ceil(unityLoadProgress * 100)}%`;

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
          <div className={`webgl-content ${isUnityLoaded ? 'show' : 'hide'}`}>
            <div id='gameContainer'>
              <Unity unityContent={unityContent} />
            </div>
            <div className='footer'>
              <div className='webgl-logo' />
              <div className='fullscreen' onClick={handleFullScreenClicked} />
              <div className='title'>
                <img className='game-icon' src={gameIcon} alt='logo' />{' '}
                {uiWordings.gameTitle}
              </div>
            </div>
          </div>
          <div className={`loading ${isUnityLoaded ? 'hide' : 'show'}`}>
            <div className='progress-container'>
              <div className='progress-text'>{unityLoadProgressPercentStr}</div>
              <br />
              {/* https://www.w3schools.com/howto/howto_js_progressbar.asp */}
              <div id='myProgress'>
                <div
                  id='myBar'
                  style={{ width: unityLoadProgressPercentStr }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CovBattle;
