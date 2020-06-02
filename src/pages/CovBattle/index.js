import React, { useCallback, useEffect } from 'react';
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

const unityContent = new UnityContent(unityBuildJsonPath, unityLoaderPath);

function CovBattle() {
  const handleFullScreenClicked = useCallback(_ => {
    unityContent.unityInstance.SetFullscreen(1);
  }, []);

  useEffect(_ => {
    const linkFunc = async _ => {
      await linkFirebaseRoomSaveManagerToUnityAsync(unityContent);
      await linkFirebaseBattleSaveManagerToUnityAsync(unityContent);
    };
    linkFunc();
    return _ => {
      unlinkFirebaseBattleSaveManagerToUnity();
    };
  }, []);

  return (
    <div className='cov-battle'>
      <div className='webgl-content'>
        <div id='gameContainer'>
          <Unity unityContent={unityContent} />
        </div>
        <div className='footer'>
          <div className='webgl-logo' />
          <div className='fullscreen' onClick={handleFullScreenClicked} />
          <div className='title'>
            <img className='game-icon' src={gameIcon} alt='logo' /> Winning the
            Flu 14日後
          </div>
        </div>
      </div>
    </div>
  );
}

export default CovBattle;
