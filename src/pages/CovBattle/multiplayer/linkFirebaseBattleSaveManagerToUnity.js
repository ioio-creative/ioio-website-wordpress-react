import { UnityBattleSceneNetworkControlGameObjectName } from './constants/constants';
import { initializeFirebaseAsync } from './firebaseCommon';
import {
  firebaseBattleSaveManagerEventTarget,
  cleanUpFirebaseDatabase,
  saveManagerEventNames,
  setUpBattle,
  saveActions
} from './firebaseBattleSaveManager';

/* private variables */

let unityContent = null;
let firebaseBattleSaveManagerEventHandlers = {};
const unityDataUpdateHandler = dataStr => {
  const dataObj = JSON.parse(dataStr);
  console.log('[Firebase] unityDataUpdate: ', dataObj);
  saveActions[dataObj.fieldName].action(dataObj.content);
};

/* end of private variables */

export const linkFirebaseBattleSaveManagerToUnityAsync = async unityContentPassedIn => {
  unityContent = unityContentPassedIn;
  const isFirebaseInitializeSuccessful = await initializeFirebaseAsync();
  if (isFirebaseInitializeSuccessful) {
    /* Communication from React to Unity */

    firebaseBattleSaveManagerEventHandlers = {};
    saveManagerEventNames.forEach(eventName => {
      const eventHandler = e => {
        const value = e.detail;
        const jsonStr = JSON.stringify({
          fieldName: eventName,
          content: value
        });
        console.log(`[Firebase] ${eventName}: ${jsonStr}`);
        unityContent.send(
          UnityBattleSceneNetworkControlGameObjectName,
          'JSDataUpdate',
          jsonStr
        );
      };
      firebaseBattleSaveManagerEventHandlers[eventName] = eventHandler;
      firebaseBattleSaveManagerEventTarget.addEventListener(
        eventName,
        eventHandler
      );
    });

    /* end of Communication from React to Unity */

    /* Communication from Unity to React */

    unityContent.on('unitySaveBattle', setUpBattle);

    unityContent.on('unityDataUpdate', unityDataUpdateHandler);

    /* end of Communication from Unity to React */
  }
};

export const unlinkFirebaseBattleSaveManagerToUnity = _ => {
  /* Communication from React to Unity */

  saveManagerEventNames.forEach(eventName => {
    firebaseBattleSaveManagerEventTarget.removeEventListener(
      eventName,
      firebaseBattleSaveManagerEventHandlers[eventName]
    );
  });
  firebaseBattleSaveManagerEventHandlers = {};

  /* end of Communication from React to Unity */

  /* Communication from Unity to React */

  /**
   * Note: there is no such thing as unityContent.off()
   */

  // if (unityContent !== null) {
  //   unityContent.off('unityDataUpdate', unityDataUpdateHandler);
  //   unityContent = null;
  // }

  /* end of Communication from Unity to React */

  cleanUpFirebaseDatabase();
};
