import NetworkRoomData from './models/networkRoomData';
import NetworkBattleData from './models/networkBattleData';
import NetworkPlayerData from './models/networkPlayerData';
import {
  ROOM_KEY_PREFIX,
  BATTLE_KEY_PREFIX,
  TOT_NUM_OF_ROOMS,
  INVALID_ROOM_ID,
  INVALID_BATTLE_ID,
  INVALID_CHARACTER_ID,
  INVALID_BATTLE_FIELD_ID,
  getDatabase,
  initializeFirebaseAsync,
  getRoomReference,
  getBattlesReference,
  setBattleValueByRefAsync,
  currentDateTimeString
} from './firebaseCommon';
import { getRandomInt } from 'utils/random';

/* constants */

export const MAX_TIMES_TO_TRY_MARK_AND_OCCUPIED_ROOM = 10;

/* end of constants */

/* private variables */

let database;

// Action<bool>
let roomIsGuestJoinedValueChangedHandler;

/* end of private variables */

/* public methods */

// can be first call point, should run initialization api

function MarkRoomAndCreateBattleReturnValue(isSuccess, roomID, battleID) {
  this.isSuccess = isSuccess;
  this.roomID = roomID;
  this.battleID = battleID;
}

export const markRoomAndCreateBattleAsync = async (
  hostCharacterIdx,
  guestCharacterIdx
) => {
  let isSuccess = false;
  let roomID = INVALID_ROOM_ID;
  let battleID = INVALID_BATTLE_ID;

  const isInitSuccessful = await initializeFirebaseAndThisManagerAsync();
  if (isInitSuccessful) {
    const markRoomAndCreateBattleReturnValue = await markRoomAndCreateBattleInternalAsync(
      hostCharacterIdx,
      guestCharacterIdx
    );
    isSuccess = markRoomAndCreateBattleReturnValue.isSuccess;
    roomID = markRoomAndCreateBattleReturnValue.roomID;
    battleID = markRoomAndCreateBattleReturnValue.battleID;
  }

  return new MarkRoomAndCreateBattleReturnValue(isSuccess, roomID, battleID);
};

export const releaseRoomAsync = async roomID => {
  await deleteRoomAsync(roomID);
};

function GuestJoinRoomCheckReturnValue(
  isSuccess,
  battleID,
  hostCharacterIdx,
  guestCharacterIdx
) {
  this.isSuccess = isSuccess;
  this.battleID = battleID;
  this.hostCharacterIdx = hostCharacterIdx;
  this.guestCharacterIdx = guestCharacterIdx;
}

// can be first call point, should run initialization api
export const guestJoinRoomCheckAsync = async roomID => {
  let isSuccess = false;
  let battleID = INVALID_BATTLE_ID;
  let hostCharacterIdx = INVALID_CHARACTER_ID;
  let guestCharacterIdx = INVALID_CHARACTER_ID;

  const isInitSuccess = await initializeFirebaseAndThisManagerAsync();
  if (!isInitSuccess) {
    return new GuestJoinRoomCheckReturnValue(
      isSuccess,
      battleID,
      hostCharacterIdx,
      guestCharacterIdx
    );
  }

  const guestJoinRoomReturnValue = await guestJoinRoomAsync(roomID);
  const isJoinRoomSuccess = guestJoinRoomReturnValue.isSuccess;
  battleID = guestJoinRoomReturnValue.battleID;
  if (!isJoinRoomSuccess) {
    return new GuestJoinRoomCheckReturnValue(
      isSuccess,
      battleID,
      hostCharacterIdx,
      guestCharacterIdx
    );
  }

  hostCharacterIdx = await getHostCharacterTypeAsync(battleID);
  guestCharacterIdx = await getGuestCharacterTypeAsync(battleID);

  isSuccess = hostCharacterIdx >= 0 && guestCharacterIdx >= 0;

  return new GuestJoinRoomCheckReturnValue(
    isSuccess,
    battleID,
    hostCharacterIdx,
    guestCharacterIdx
  );
};

export const releaseRoomGuestAsync = async roomID => {
  await setRoomIsGuestJoinedSafeAsync(roomID, false);
};

export const subscribeToIsGuestJoinedValueChanged = (roomID, handler) => {
  const isGuestJoinedRef = getIsGuestJoinedRef(roomID);
  roomIsGuestJoinedValueChangedHandler = handler;
  isGuestJoinedRef.on('value', onRoomIsGuestJoinedValueChangedHandler);
};

export const unsubscribeFromIsGuestJoinedValueChanged = roomID => {
  const isGuestJoinedRef = getIsGuestJoinedRef(roomID);
  roomIsGuestJoinedValueChangedHandler = null;
  isGuestJoinedRef.off('value', onRoomIsGuestJoinedValueChangedHandler);
};

/* end of public methods */

/* Database Initiallization API */

const initializeFirebaseAndThisManagerAsync = async _ => {
  let isSuccess = false;

  isSuccess = await initializeFirebaseAsync();
  if (!isSuccess) {
    return false;
  }

  isSuccess = await initializeThisManagerAsync();

  return isSuccess;
};

const initializeThisManagerAsync = async _ => {
  let isSuccess = true;

  try {
    database = getDatabase();
  } catch (error) {
    console.error(
      '[Firebase] firebaseRoomSaveManager initializeThisManagerAsync() error:'
    );
    console.error(error);
    isSuccess = false;
  }

  return isSuccess;
};

/* end of Database Initiallization API */

/* Room and Battle Mix API */

function MarkRoomAndCreateBattleInternalReturnValue(
  isSuccess,
  roomID,
  battleID
) {
  this.isSuccess = isSuccess;
  this.roomID = roomID;
  this.battleID = battleID;
}

const markRoomAndCreateBattleInternalAsync = async (
  hostCharacterIdx,
  guestCharacterIdx
) => {
  let isSuccess = false;
  let roomID = INVALID_ROOM_ID;
  let battleID = INVALID_BATTLE_ID;

  let isMarkRoomSuccess = false;
  const markRoomTrialsReturnValue = await markRoomTrialsAsync();
  isMarkRoomSuccess = markRoomTrialsReturnValue.isSuccess;
  roomID = markRoomTrialsReturnValue.roomID;

  if (isMarkRoomSuccess) {
    try {
      battleID = await createBattleAsync(hostCharacterIdx, guestCharacterIdx);
    } catch (error) {
      console.error('[Firebase] CreateBattleAsync Exception: ' + error);
      return new MarkRoomAndCreateBattleInternalReturnValue(
        isSuccess,
        roomID,
        battleID
      );
    }

    try {
      await setRoomBattleIDAsync(roomID, battleID);
    } catch (error) {
      console.error('[Firebase] SetRoomBattleID Exception: ' + error);
      return new MarkRoomAndCreateBattleInternalReturnValue(
        isSuccess,
        roomID,
        battleID
      );
    }

    isSuccess = true;
  } else {
    console.log('[Firebase] MarkRoomAndCreateBattle: no unoccupied rooms');
  }

  return new MarkRoomAndCreateBattleInternalReturnValue(
    isSuccess,
    roomID,
    battleID
  );
};

/* end of Room and Battle Mix API */

/* Rooms API */

const getUnoccupiedRoomIDAsync = async _ => {
  const roomID = getRandomInt(0, TOT_NUM_OF_ROOMS);
  const roomRef = getRoomReference(roomID);
  const roomSnapshot = await roomRef.once('value');
  return !roomSnapshot.val() ? roomID : INVALID_ROOM_ID;
};

const markRoomAsync = async roomID => {
  const roomRef = getRoomReference(roomID);

  // https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
  /**
   * !!! Very Important !!! Don't return TransactionResult.Abort() when mutableData.Value == null
   * Note: Because RunTransaction() is called multiple times, it must be able to handle null data. Even if there is existing data in your remote database, it may not be locally cached when the transaction function is run, resulting in null for the initial value.
   */
  await roomRef.transaction(
    function transactionUpdate(room) {
      // console.log(room);

      // if room occupied
      if (room !== null) {
        // abort the transaction
        return;
      }

      // if room not occupied
      // Mark the room using a new "object"
      return new NetworkRoomData(false, null);
    },
    function onComplete(error, committed, snapshot) {
      if (error) {
        console.log(
          '[Firebase] firebaseRoomSaveManager markRoomAsync transaction failed abnormally!',
          error
        );
      } else if (!committed) {
        console.log(
          '[Firebase] firebaseRoomSaveManager markRoomAsync transaction aborted (because room already exists).'
        );
      } else {
        console.log(
          '[Firebase] firebaseRoomSaveManager markRoomAsync transaction: room created!'
        );
      }
      console.log(
        '[Firebase] firebaseRoomSaveManager markRoomAsync transaction: room data:',
        snapshot.val()
      );
    }
  );
};

function MarkRoomTrialsReturnValue(isSuccess, roomID) {
  this.isSuccess = isSuccess;
  this.roomID = roomID;
}

// https://answers.unity.com/questions/984382/return-result-of-the-ienumerator.html
const markRoomTrialsAsync = async _ => {
  let isSuccess = false;
  let roomID = INVALID_ROOM_ID;
  let numOfTrials = 0;
  while (roomID < 0 && numOfTrials < MAX_TIMES_TO_TRY_MARK_AND_OCCUPIED_ROOM) {
    numOfTrials++;
    console.log('[Fireabse] GetAndMarkOccupiedRoom: trial ' + numOfTrials);

    try {
      roomID = await getUnoccupiedRoomIDAsync();
    } catch (error) {
      console.error('[Firebase] GetUnoccupiedRoomID Exception: ' + error);
      continue;
    }

    if (roomID >= 0) {
      try {
        markRoomAsync(roomID);
      } catch (error) {
        console.error('[Firebase] GetUnoccupiedRoomID Exception: ' + error);
        continue;
      }

      console.log('[Firebase] Room ' + roomID + ' marked');
      isSuccess = true;
    }

    // TODO: run each trial on different frames
    //yield return null;
  }

  return new MarkRoomTrialsReturnValue(isSuccess, roomID);
};

const setRoomBattleIDAsync = (roomID, battleID) => {
  const battleIDRef = database.ref(ROOM_KEY_PREFIX + roomID + '/BattleID');
  return new Promise((res, rej) => {
    battleIDRef.set(battleID, error => {
      if (error) {
        rej(error);
        return;
      }
      res();
    });
  });
};

const deleteRoomAsync = roomID => {
  const roomRef = getRoomReference(roomID);
  return new Promise((res, rej) => {
    roomRef.set(null, error => {
      if (error) {
        rej(error);
        return;
      }
      res();
    });
  });
};

// only set IsGuestJoined when Room exists
const setRoomIsGuestJoinedSafeAsync = async (roomID, isGuestJoined) => {
  const roomRef = getRoomReference(roomID);
  await roomRef.transaction(
    function transactionUpdate(room) {
      let roomToReturn = room;

      if (room) {
        const battleID = String(room['BattleID']);

        // Mark the room using a new "object"
        roomToReturn = new NetworkRoomData(isGuestJoined, battleID);
      }

      return roomToReturn;
    },
    function onComplete(error, committed, snapshot) {
      if (error) {
        console.log(
          '[Firebase] setRoomIsGuestJoinedSafeAsync transaction failed abnormally!',
          error
        );
      } else if (!committed) {
        console.log(
          '[Firebase] setRoomIsGuestJoinedSafeAsync transaction aborted (because ...).'
        );
      } else {
        console.log(
          '[Firebase] setRoomIsGuestJoinedSafeAsync transaction completed successfully.'
        );
      }
      console.log(
        "[Firebase] setRoomIsGuestJoinedSafeAsync transaction: room's data: ",
        snapshot.val()
      );
    }
  );
};

function GuestJoinRoomReturnValue(isSuccess, battleID) {
  this.isSuccess = isSuccess;
  this.battleID = battleID;
}

const guestJoinRoomAsync = async roomID => {
  let isSuccess = false;
  let battleID = INVALID_BATTLE_ID;

  console.log('[Fireabase] guestJoinRoomAsync roomID:', roomID);
  const roomRef = getRoomReference(roomID);
  console.log('[Fireabase] guestJoinRoomAsync roomRef:', roomRef);

  // roomRef.once('value', snapshot => {
  //   console.log(
  //     '[Fireabase] guestJoinRoomAsync roomRef value:',
  //     snapshot.val()
  //   );
  // });

  // https://firebase.google.com/docs/database/web/read-and-write
  /**
   * !!! Very Important !!! Don't return TransactionResult.Abort() when mutableData.Value == null
   * Note: Because RunTransaction() is called multiple times, it must be able to handle null data. Even if there is existing data in your remote database, it may not be locally cached when the transaction function is run, resulting in null for the initial value.
   */
  await roomRef.transaction(
    function transactionUpdate(room) {
      console.log('[Fireabase] guestJoinRoomAsync room:', room);

      let roomToReturn = room;

      // !!! Very Important !!! Don't return TransactionResult.Abort() when mutableData.Value == null
      // i.e. don't call 'return;' when room === null
      // transactionUpdate() should be able to handle initial null values

      if (room) {
        // Check isGuestJoined
        const isGuestJoined = Boolean(room['IsGuestJoined']);
        battleID = String(room['BattleID']);

        console.log(
          '[Fireabase] guestJoinRoomAsync isGuestJoined:',
          isGuestJoined
        );
        console.log('[Fireabase] guestJoinRoomAsync battleID:', battleID);

        if (isGuestJoined || !battleID) {
          // Abort the transaction
          return;
        }

        // Mark the room using a new "object"
        roomToReturn = new NetworkRoomData(true, battleID);

        isSuccess = true;
      }

      return roomToReturn;
    },
    function onComplete(error, committed, snapshot) {
      if (error) {
        console.log(
          '[Firebase] guestJoinRoomAsync transaction failed abnormally!',
          error
        );
      } else if (!committed) {
        console.log(
          '[Firebase] guestJoinRoomAsync transaction aborted (because room, isGuestJoined or battleID is missing).'
        );
      } else {
        console.log(
          '[Firebase] guestJoinRoomAsync transaction completed successfully.'
        );
      }
      console.log(
        "[Firebase] guestJoinRoomAsync transaction: room's data: ",
        snapshot.val()
      );
    }
  );

  return new GuestJoinRoomReturnValue(isSuccess, battleID);
};

const getIsGuestJoinedRef = roomID => {
  return database.ref(ROOM_KEY_PREFIX + roomID + '/IsGuestJoined');
};

/* end of Rooms API */

/* Rooms event handler */

const onRoomIsGuestJoinedValueChangedHandler = snapshot => {
  const value = Boolean(snapshot.val());
  if (roomIsGuestJoinedValueChangedHandler) {
    roomIsGuestJoinedValueChangedHandler(value);
  }
};

/* end of Rooms event handler */

/* Battles API */

const createBattleAsync = async (hostCharacterIdx, guestCharacterIdx) => {
  const newBattleRef = getBattlesReference().push();

  const networkBattleData = new NetworkBattleData();
  networkBattleData.CreateDT = currentDateTimeString();
  networkBattleData.HostPlayer = new NetworkPlayerData();
  networkBattleData.HostPlayer.CharacterType = hostCharacterIdx;
  networkBattleData.GuestPlayer = new NetworkPlayerData();
  networkBattleData.GuestPlayer.CharacterType = guestCharacterIdx;
  networkBattleData.BattleField = INVALID_BATTLE_FIELD_ID;

  await setBattleValueByRefAsync(newBattleRef, networkBattleData);

  console.log(
    '[Firebase] CreateBattleAsync: new battle id - ' + newBattleRef.key
  );

  return newBattleRef.key;
};

const getHostCharacterTypeAsync = async battleID => {
  const snapshot = await database
    .ref(BATTLE_KEY_PREFIX + battleID + '/HostPlayer/CharacterType')
    .once('value');
  return Number(snapshot.val());
};

const getGuestCharacterTypeAsync = async battleID => {
  const snapshot = await database
    .ref(BATTLE_KEY_PREFIX + battleID + '/GuestPlayer/CharacterType')
    .once('value');
  return Number(snapshot.val());
};

/* end of Battles API */
