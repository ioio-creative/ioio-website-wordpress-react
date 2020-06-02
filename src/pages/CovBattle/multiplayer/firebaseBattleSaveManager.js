import { EventTarget, defineEventAttribute } from 'event-target-shim';
import NetworkBattleData from './models/networkBattleData';
import { BATTLE_KEY_PREFIX, getDatabase } from './firebaseCommon';

/* events, https://www.npmjs.com/package/event-target-shim */

class FirebaseBattleSaveManagerEventTarget extends EventTarget {}

/**
 * !!!Important!!!
 * somehow event name must start with small letters
 */
export const saveManagerEventNames = [
  'saveBattleFieldUpdated',
  'saveWindStrengthUpdated',
  'saveAttackStrengthUpdated',
  'saveIsDefenseCompletedUpdated',
  'saveIsOffenseCompletedUpdated',
  'saveHostPlayerCurrentHPUpdated',
  'saveGuestPlayerCurrentHPUpdated',
  'saveHostPlayerSelectedDefensiveEffectUpdated',
  'saveGuestPlayerSelectedDefensiveEffectUpdated',
  'saveHostPlayerSelectedOffensiveEffectUpdated',
  'saveGuestPlayerSelectedOffensiveEffectUpdated',
  'saveHostPlayerFirstRoleUpdated',
  'saveGuestPlayerFirstRoleUpdated',
  'saveHostPlayerIsReadyUpdated',
  'saveGuestPlayerIsReadyUpdated',
  'saveHostPlayerPlayAgainReplyTypeUpdated',
  'saveGuestPlayerPlayAgainReplyTypeUpdated'
];

saveManagerEventNames.forEach(eventName => {
  defineEventAttribute(
    FirebaseBattleSaveManagerEventTarget.prototype,
    eventName
  );
});

export const firebaseBattleSaveManagerEventTarget = new FirebaseBattleSaveManagerEventTarget();

/* end of events */

/* private variables */

const lastNetworkBattleData = new NetworkBattleData();

let battleID;

let database;

//let battleRef;
let battleFieldRef;
let windStrengthRef;
let attackStrengthRef;
let isDefenseCompletedRef;
let isOffenseCompletedRef;
let hostPlayerCurrentHPRef;
let guestPlayerCurrentHPRef;
let hostPlayerSelectedDefensiveEffectRef;
let guestPlayerSelectedDefensiveEffectRef;
let hostPlayerSelectedOffensiveEffectRef;
let guestPlayerSelectedOffensiveEffectRef;
let hostPlayerFirstRoleRef;
let guestPlayerFirstRoleRef;
let hostPlayerIsReadyRef;
let guestPlayerIsReadyRef;
let hostPlayerPlayAgainReplyTypeRef;
let guestPlayerPlayAgainReplyTypeRef;

/* end of private variables */

/* clean-up */

export const cleanUpFirebaseDatabase = _ => {
  // https://firebase.google.com/docs/database/web/read-and-write#detach_listeners
  if (battleFieldRef)
    battleFieldRef.off('value', onBattleFieldValueChangedHandler);
  if (windStrengthRef)
    windStrengthRef.off('value', onWindStrengthValueChangedHandler);
  if (attackStrengthRef)
    attackStrengthRef.off('value', onAttackStrengthValueChangedHandler);
  if (isDefenseCompletedRef)
    isDefenseCompletedRef.off('value', onIsDefenseCompletedValueChangedHandler);
  if (isOffenseCompletedRef)
    isOffenseCompletedRef.off('value', onIsOffenseCompletedValueChangedHandler);
  if (hostPlayerCurrentHPRef)
    hostPlayerCurrentHPRef.off(
      'value',
      onHostPlayerCurrentHPValueChangedHandler
    );
  if (guestPlayerCurrentHPRef)
    guestPlayerCurrentHPRef.off(
      'value',
      onGuestPlayerCurrentHPValueChangedHandler
    );
  if (hostPlayerSelectedDefensiveEffectRef)
    hostPlayerSelectedDefensiveEffectRef.off(
      'value',
      onHostPlayerSelectedDefensiveEffectValueChangedHandler
    );
  if (guestPlayerSelectedDefensiveEffectRef)
    guestPlayerSelectedDefensiveEffectRef.off(
      'value',
      onGuestPlayerSelectedDefensiveEffectValueChangedHandler
    );
  if (hostPlayerSelectedOffensiveEffectRef)
    hostPlayerSelectedOffensiveEffectRef.off(
      'value',
      onHostPlayerSelectedOffensiveEffectValueChangedHandler
    );
  if (guestPlayerSelectedOffensiveEffectRef)
    guestPlayerSelectedOffensiveEffectRef.off(
      'value',
      onGuestPlayerSelectedOffensiveEffectValueChangedHandler
    );
  if (hostPlayerFirstRoleRef)
    hostPlayerFirstRoleRef.off(
      'value',
      onHostPlayerFirstRoleValueChangedHandler
    );
  if (guestPlayerFirstRoleRef)
    guestPlayerFirstRoleRef.off(
      'value',
      onGuestPlayerFirstRoleValueChangedHandler
    );
  if (hostPlayerIsReadyRef)
    hostPlayerIsReadyRef.off('value', onHostPlayerIsReadyValueChangedHandler);
  if (guestPlayerIsReadyRef)
    guestPlayerIsReadyRef.off('value', onGuestPlayerIsReadyValueChangedHandler);
  if (hostPlayerPlayAgainReplyTypeRef)
    hostPlayerPlayAgainReplyTypeRef.off(
      'value',
      onHostPlayerPlayAgainReplyTypeValueChangedHandler
    );
  if (guestPlayerPlayAgainReplyTypeRef)
    guestPlayerPlayAgainReplyTypeRef.off(
      'value',
      onGuestPlayerPlayAgainReplyTypeValueChangedHandler
    );

  database = null;
  //battleRef = null;
  battleFieldRef = null;
  windStrengthRef = null;
  attackStrengthRef = null;
  isDefenseCompletedRef = null;
  isOffenseCompletedRef = null;
  hostPlayerCurrentHPRef = null;
  guestPlayerCurrentHPRef = null;
  hostPlayerSelectedDefensiveEffectRef = null;
  guestPlayerSelectedDefensiveEffectRef = null;
  hostPlayerSelectedOffensiveEffectRef = null;
  guestPlayerSelectedOffensiveEffectRef = null;
  hostPlayerFirstRoleRef = null;
  guestPlayerFirstRoleRef = null;
  hostPlayerIsReadyRef = null;
  guestPlayerIsReadyRef = null;
  hostPlayerPlayAgainReplyTypeRef = null;
  guestPlayerPlayAgainReplyTypeRef = null;
};

/* end of clean-up */

/* start-up */

export const setUpBattle = aBattleID => {
  if (battleID) {
    cleanUpFirebaseDatabase();
  }

  battleID = aBattleID;
  database = getDatabase();

  const battleWholeKey = BATTLE_KEY_PREFIX + battleID;
  //battleRef = database.ref(battleWholeKey);
  battleFieldRef = database.ref(battleWholeKey + '/BattleField');
  windStrengthRef = database.ref(battleWholeKey + '/WindStrength');
  attackStrengthRef = database.ref(battleWholeKey + '/AttackStrength');
  isDefenseCompletedRef = database.ref(battleWholeKey + '/IsDefenseCompleted');
  isOffenseCompletedRef = database.ref(battleWholeKey + '/IsOffenseCompleted');
  hostPlayerCurrentHPRef = database.ref(
    battleWholeKey + '/HostPlayer/CurrentHP'
  );
  guestPlayerCurrentHPRef = database.ref(
    battleWholeKey + '/GuestPlayer/CurrentHP'
  );
  hostPlayerSelectedDefensiveEffectRef = database.ref(
    battleWholeKey + '/HostPlayer/SelectedDefensiveEffectType'
  );
  guestPlayerSelectedDefensiveEffectRef = database.ref(
    battleWholeKey + '/GuestPlayer/SelectedDefensiveEffectType'
  );
  hostPlayerSelectedOffensiveEffectRef = database.ref(
    battleWholeKey + '/HostPlayer/SelectedOffensiveEffectType'
  );
  guestPlayerSelectedOffensiveEffectRef = database.ref(
    battleWholeKey + '/GuestPlayer/SelectedOffensiveEffectType'
  );
  hostPlayerFirstRoleRef = database.ref(
    battleWholeKey + '/HostPlayer/FirstRole'
  );
  guestPlayerFirstRoleRef = database.ref(
    battleWholeKey + '/GuestPlayer/FirstRole'
  );
  hostPlayerIsReadyRef = database.ref(battleWholeKey + '/HostPlayer/IsReady');
  guestPlayerIsReadyRef = database.ref(battleWholeKey + '/GuestPlayer/IsReady');
  hostPlayerPlayAgainReplyTypeRef = database.ref(
    battleWholeKey + '/HostPlayer/PlayAgainReplyType'
  );
  guestPlayerPlayAgainReplyTypeRef = database.ref(
    battleWholeKey + '/GuestPlayer/PlayAgainReplyType'
  );

  battleFieldRef.on('value', onBattleFieldValueChangedHandler);
  windStrengthRef.on('value', onWindStrengthValueChangedHandler);
  attackStrengthRef.on('value', onAttackStrengthValueChangedHandler);
  isDefenseCompletedRef.on('value', onIsDefenseCompletedValueChangedHandler);
  isOffenseCompletedRef.on('value', onIsOffenseCompletedValueChangedHandler);
  hostPlayerCurrentHPRef.on('value', onHostPlayerCurrentHPValueChangedHandler);
  guestPlayerCurrentHPRef.on(
    'value',
    onGuestPlayerCurrentHPValueChangedHandler
  );
  hostPlayerSelectedDefensiveEffectRef.on(
    'value',
    onHostPlayerSelectedDefensiveEffectValueChangedHandler
  );
  guestPlayerSelectedDefensiveEffectRef.on(
    'value',
    onGuestPlayerSelectedDefensiveEffectValueChangedHandler
  );
  hostPlayerSelectedOffensiveEffectRef.on(
    'value',
    onHostPlayerSelectedOffensiveEffectValueChangedHandler
  );
  guestPlayerSelectedOffensiveEffectRef.on(
    'value',
    onGuestPlayerSelectedOffensiveEffectValueChangedHandler
  );
  hostPlayerFirstRoleRef.on('value', onHostPlayerFirstRoleValueChangedHandler);
  guestPlayerFirstRoleRef.on(
    'value',
    onGuestPlayerFirstRoleValueChangedHandler
  );
  hostPlayerIsReadyRef.on('value', onHostPlayerIsReadyValueChangedHandler);
  guestPlayerIsReadyRef.on('value', onGuestPlayerIsReadyValueChangedHandler);
  hostPlayerPlayAgainReplyTypeRef.on(
    'value',
    onHostPlayerPlayAgainReplyTypeValueChangedHandler
  );
  guestPlayerPlayAgainReplyTypeRef.on(
    'value',
    onGuestPlayerPlayAgainReplyTypeValueChangedHandler
  );
};

/* end of start-up */

/* save actions */

export const saveActions = {
  saveBattle: {
    id: 'saveBattle',
    action: aBattleKey => {
      const battleKey = String(aBattleKey);
      if (battleKey !== battleID) {
        setUpBattle(battleKey);

        /**
         * Actually, no need to save as it would have already been done in Start Scene
         */
        //string battleJson = JsonUtility.ToJson(lastNetworkBattleData);
        //await battleRef.SetRawJsonValueAsync(battleJson);
      }
    }
  },
  saveBattleField: {
    id: 'saveBattleField',
    action: someBattleFieldType => {
      const battleFieldType = Number(someBattleFieldType);
      if (battleFieldType !== lastNetworkBattleData.BattleField) {
        battleFieldRef.set(battleFieldType);
      }
    }
  },
  saveWindStrength: {
    id: 'saveWindStrength',
    action: someWindStrength => {
      const windStrength = Number(someWindStrength);
      if (windStrength !== lastNetworkBattleData.WindStrength) {
        windStrengthRef.set(windStrength);
      }
    }
  },
  saveAttackStrength: {
    id: 'saveAttackStrength',
    action: someAttackStrength => {
      const attackStrength = Number(someAttackStrength);
      if (attackStrength !== lastNetworkBattleData.AttackStrength) {
        attackStrengthRef.set(attackStrength);
      }
    }
  },
  saveIsDefenseCompleted: {
    id: 'saveIsDefenseCompleted',
    action: boolVal => {
      const isDefenseCompleted = myParseBool(boolVal);
      if (isDefenseCompleted !== lastNetworkBattleData.IsDefenseCompleted) {
        isDefenseCompletedRef.set(isDefenseCompleted);
      }
    }
  },
  saveIsOffenseCompleted: {
    id: 'saveIsOffenseCompleted',
    action: boolVal => {
      const isOffenseCompleted = myParseBool(boolVal);
      if (isOffenseCompleted !== lastNetworkBattleData.IsOffenseCompleted) {
        isOffenseCompletedRef.set(isOffenseCompleted);
      }
    }
  },
  saveHostPlayerCurrentHP: {
    id: 'saveHostPlayerCurrentHP',
    action: hp => {
      const myHp = Number(hp);
      if (myHp !== lastNetworkBattleData.HostPlayer.CurrentHP) {
        hostPlayerCurrentHPRef.set(myHp);
      }
    }
  },
  saveGuestPlayerCurrentHP: {
    id: 'saveGuestPlayerCurrentHP',
    action: hp => {
      const myHp = Number(hp);
      if (myHp !== lastNetworkBattleData.GuestPlayer.CurrentHP) {
        guestPlayerCurrentHPRef.set(myHp);
      }
    }
  },
  saveHostPlayerSelectedDefensiveEffect: {
    id: 'saveHostPlayerSelectedDefensiveEffect',
    action: effect => {
      const myEffect = Number(effect);
      if (
        myEffect !==
        lastNetworkBattleData.HostPlayer.SelectedDefensiveEffectType
      ) {
        hostPlayerSelectedDefensiveEffectRef.set(myEffect);
      }
    }
  },
  saveGuestPlayerSelectedDefensiveEffect: {
    id: 'saveGuestPlayerSelectedDefensiveEffect',
    action: effect => {
      const myEffect = Number(effect);
      if (
        myEffect !==
        lastNetworkBattleData.GuestPlayer.SelectedDefensiveEffectType
      ) {
        guestPlayerSelectedDefensiveEffectRef.set(myEffect);
      }
    }
  },
  saveHostPlayerSelectedOffensiveEffect: {
    id: 'saveHostPlayerSelectedOffensiveEffect',
    action: effect => {
      const myEffect = Number(effect);
      if (
        myEffect !==
        lastNetworkBattleData.HostPlayer.SelectedOffensiveEffectType
      ) {
        hostPlayerSelectedOffensiveEffectRef.set(myEffect);
      }
    }
  },
  saveGuestPlayerSelectedOffensiveEffect: {
    id: 'saveGuestPlayerSelectedOffensiveEffect',
    action: effect => {
      const myEffect = Number(effect);
      if (
        myEffect !==
        lastNetworkBattleData.GuestPlayer.SelectedOffensiveEffectType
      ) {
        guestPlayerSelectedOffensiveEffectRef.set(myEffect);
      }
    }
  },
  saveHostPlayerFirstRole: {
    id: 'saveHostPlayerFirstRole',
    action: role => {
      const myRole = Number(role);
      if (myRole !== lastNetworkBattleData.HostPlayer.FirstRole) {
        hostPlayerFirstRoleRef.set(myRole);
      }
    }
  },
  saveGuestPlayerFirstRole: {
    id: 'saveGuestPlayerFirstRole',
    action: role => {
      const myRole = Number(role);
      if (myRole !== lastNetworkBattleData.GuestPlayer.FirstRole) {
        guestPlayerFirstRoleRef.set(myRole);
      }
    }
  },
  saveHostPlayerIsReady: {
    id: 'saveHostPlayerIsReady',
    action: isReady => {
      const myIsReady = myParseBool(isReady);
      if (myIsReady !== lastNetworkBattleData.HostPlayer.IsReady) {
        hostPlayerIsReadyRef.set(myIsReady);
      }
    }
  },
  saveGuestPlayerIsReady: {
    id: 'saveGuestPlayerIsReady',
    action: isReady => {
      const myIsReady = myParseBool(isReady);
      if (myIsReady !== lastNetworkBattleData.GuestPlayer.IsReady) {
        guestPlayerIsReadyRef.set(myIsReady);
      }
    }
  },
  saveHostPlayerPlayAgainReplyType: {
    id: 'saveHostPlayerPlayAgainReplyType',
    action: playAgainReply => {
      const myPlayAgainReply = Number(playAgainReply);
      if (
        myPlayAgainReply !== lastNetworkBattleData.HostPlayer.PlayAgainReplyType
      ) {
        hostPlayerPlayAgainReplyTypeRef.set(myPlayAgainReply);
      }
    }
  },
  saveGuestPlayerPlayAgainReplyType: {
    id: 'saveGuestPlayerPlayAgainReplyType',
    action: playAgainReply => {
      const myPlayAgainReply = Number(playAgainReply);
      if (
        myPlayAgainReply !==
        lastNetworkBattleData.GuestPlayer.PlayAgainReplyType
      ) {
        guestPlayerPlayAgainReplyTypeRef.set(myPlayAgainReply);
      }
    }
  }
};

/* end of save action */

/* on value changed handlers */

const dispatchEvent = (typeArg, customEventInitDetail) => {
  firebaseBattleSaveManagerEventTarget.dispatchEvent(
    new CustomEvent(typeArg, {
      detail: customEventInitDetail
    })
  );
};

const onBattleFieldValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.BattleField = value;
  dispatchEvent('saveBattleFieldUpdated', value);
};

const onWindStrengthValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.WindStrength = value;
  dispatchEvent('saveWindStrengthUpdated', value);
};

const onAttackStrengthValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.AttackStrength = value;
  dispatchEvent('saveAttackStrengthUpdated', value);
};

const onIsDefenseCompletedValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.IsDefenseCompleted = value;
  dispatchEvent('saveIsDefenseCompletedUpdated', value);
};

const onIsOffenseCompletedValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.IsOffenseCompleted = value;
  dispatchEvent('saveIsOffenseCompletedUpdated', value);
};

const onHostPlayerCurrentHPValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.HostPlayer.CurrentHP = value;
  dispatchEvent('saveHostPlayerCurrentHPUpdated', value);
};

const onGuestPlayerCurrentHPValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.GuestPlayer.CurrentHP = value;
  dispatchEvent('saveGuestPlayerCurrentHPUpdated', value);
};

const onHostPlayerSelectedDefensiveEffectValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.HostPlayer.SelectedDefensiveEffectType = value;
  dispatchEvent('saveHostPlayerSelectedDefensiveEffectUpdated', value);
};

const onGuestPlayerSelectedDefensiveEffectValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.GuestPlayer.SelectedDefensiveEffectType = value;
  dispatchEvent('saveGuestPlayerSelectedDefensiveEffectUpdated', value);
};

const onHostPlayerSelectedOffensiveEffectValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.HostPlayer.SelectedOffensiveEffectType = value;
  dispatchEvent('saveHostPlayerSelectedOffensiveEffectUpdated', value);
};

const onGuestPlayerSelectedOffensiveEffectValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.GuestPlayer.SelectedOffensiveEffectType = value;
  dispatchEvent('saveGuestPlayerSelectedOffensiveEffectUpdated', value);
};

const onHostPlayerFirstRoleValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.HostPlayer.FirstRole = value;
  dispatchEvent('saveHostPlayerFirstRoleUpdated', value);
};

const onGuestPlayerFirstRoleValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.GuestPlayer.FirstRole = value;
  dispatchEvent('saveGuestPlayerFirstRoleUpdated', value);
};

const onHostPlayerIsReadyValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.HostPlayer.IsReady = value;
  dispatchEvent('saveHostPlayerIsReadyUpdated', value);
};

const onGuestPlayerIsReadyValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.GuestPlayer.IsReady = value;
  dispatchEvent('saveGuestPlayerIsReadyUpdated', value);
};

const onHostPlayerPlayAgainReplyTypeValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.HostPlayer.PlayAgainReplyType = value;
  dispatchEvent('saveHostPlayerPlayAgainReplyTypeUpdated', value);
};

const onGuestPlayerPlayAgainReplyTypeValueChangedHandler = snapshot => {
  const value = snapshot.val();
  lastNetworkBattleData.GuestPlayer.PlayAgainReplyType = value;
  dispatchEvent('saveGuestPlayerPlayAgainReplyTypeUpdated', value);
};

/* end of on value changed handlers */

/* utils */

const myParseBool = obj => {
  if (typeof obj === 'string') {
    return obj.toLowerCase() !== 'false';
  }
  return Boolean(obj);
};

/* end of utils */
