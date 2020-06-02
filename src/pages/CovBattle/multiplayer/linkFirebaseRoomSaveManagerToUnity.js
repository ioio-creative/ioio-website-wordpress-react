import { UnityStartSceneNetworkControlGameObjectName } from './constants/constants';
import {
  markRoomAndCreateBattleAsync,
  guestJoinRoomCheckAsync,
  releaseRoomGuestAsync,
  releaseRoomAsync,
  subscribeToIsGuestJoinedValueChanged,
  unsubscribeFromIsGuestJoinedValueChanged
} from './firebaseRoomSaveManager';

/* private variables */

let unityContent = null;
const handleIsGuestJoinedValueChanged = isGuestJoined => {
  unityContent.send(
    UnityStartSceneNetworkControlGameObjectName,
    'JSOnIsGuestJoinedValueChanged',
    String(isGuestJoined)
  );
};

/* end of private variables */

export const linkFirebaseRoomSaveManagerToUnityAsync = async unityContentPassedIn => {
  unityContent = unityContentPassedIn;

  /* Communication from Unity to React */

  unityContent.on('markRoomAndCreateBattle', async dataStr => {
    const data = JSON.parse(dataStr);
    const markRoomAndCreateBattleReturnValue = await markRoomAndCreateBattleAsync(
      Number(data.hostCharacterIdx),
      Number(data.guestCharacterIdx)
    );
    unityContent.send(
      UnityStartSceneNetworkControlGameObjectName,
      'JSMarkRoomAndCreateBattle',
      JSON.stringify(markRoomAndCreateBattleReturnValue)
    );
  });

  unityContent.on('guestJoinRoomCheck', async roomID => {
    const guestJoinRoomCheckReturnValue = await guestJoinRoomCheckAsync(
      Number(roomID)
    );
    unityContent.send(
      UnityStartSceneNetworkControlGameObjectName,
      'JSGuestJoinRoomCheck',
      JSON.stringify(guestJoinRoomCheckReturnValue)
    );
  });

  unityContent.on('releaseRoomGuest', async roomID => {
    await releaseRoomGuestAsync(roomID);
    unityContent.send(
      UnityStartSceneNetworkControlGameObjectName,
      'JSReleaseRoomGuest'
    );
  });

  unityContent.on('releaseRoom', async roomID => {
    await releaseRoomAsync(roomID);
  });

  unityContent.on('subscribeToIsGuestJoinedValueChanged', roomID => {
    subscribeToIsGuestJoinedValueChanged(
      Number(roomID),
      handleIsGuestJoinedValueChanged
    );
  });

  unityContent.on('unsubscribeFromIsGuestJoinedValueChanged', roomID => {
    unsubscribeFromIsGuestJoinedValueChanged(
      Number(roomID),
      handleIsGuestJoinedValueChanged
    );
  });

  /* end of Communication from Unity to React */
};
