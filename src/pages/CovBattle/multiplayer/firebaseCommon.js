// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/database';

import dayjs from 'dayjs';

/* constants */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBD9FZz-1CI2zMilombBaa64-ddqcYlKHg',
  authDomain: 'cov-battle.firebaseapp.com',
  databaseURL: 'https://cov-battle.firebaseio.com',
  projectId: 'cov-battle',
  storageBucket: 'cov-battle.appspot.com',
  messagingSenderId: '695913108559',
  appId: '1:695913108559:web:33d2ed111646325f2cc63a',
  measurementId: 'G-6C61RSD3Y7'
};

// https://day.js.org/docs/en/parse/string-format
const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';

export const ROOM_KEY_PREFIX = 'Rooms/';
export const TOT_NUM_OF_ROOMS = 10000;
export const INVALID_ROOM_ID = -1;
export const INVALID_CHARACTER_ID = -1;
export const INVALID_BATTLE_FIELD_ID = -1;
export const INVALID_BATTLE_ID = null;

export const BATTLE_KEY_PREFIX = 'Battles/';

/* end of constants */

/* initialization */

let isInitializeSuccessful = false;

// https://firebase.google.com/docs/auth/web/anonymous-auth?authuser=1

// https://firebase.googleblog.com/2019/07/firebase-and-tasks-how-to-deal-with.html
export const initializeFirebaseAsync = _ => {
  return new Promise(async (res, rej) => {
    if (!isInitializeSuccessful) {
      try {
        // Initialize Firebase
        console.log('[Firebase] initializing');
        firebase.initializeApp(firebaseConfig);
        console.log('[Firebase] adding analytics');
        firebase.analytics();

        //console.log("Firebase checking dependencies");

        console.log('[Firebase] signing in anonymously');
        // https://firebase.google.com/docs/auth/unity/anonymous-auth
        // https://firebase.google.com/docs/auth/web/anonymous-auth
        await firebase.auth().signInAnonymously();

        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            //const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            console.log(`[Firebase] user signed in successfully: ${uid}`);
          } else {
            // User is signed out.
            console.log('[Firebase] user signed out');
          }
        });

        isInitializeSuccessful = true;
        console.log('[Firebase] initialized');

        res(isInitializeSuccessful);
      } catch (error) {
        const { code, message, ...errorRest } = error;
        if (code) {
          console.error('[Firebase] init error code: ' + code);
        }
        if (message) {
          console.error('[Firebase] init error message: ' + message);
        }
        console.error('[Firebase] init error rest: ' + errorRest);

        rej(error);
      }
    } else {
      res(isInitializeSuccessful);
    }
  });
};

/* end of initialization */

/* database */

let database = null;

export const getDatabase = _ => {
  if (database == null) {
    database = firebase.database();
  }
  return database;
};

/* end of database */

/* rooms api */

export const getRoomsReference = _ => {
  return getDatabase().ref(ROOM_KEY_PREFIX);
};

export const getRoomReference = roomID => {
  return getDatabase().ref(ROOM_KEY_PREFIX + roomID);
};

export const setRoomValueByRefAsync = (roomRef, roomData) => {
  return new Promise((res, rej) => {
    roomRef.set(roomData, error => {
      if (error) {
        rej(error);
        return;
      }
      res();
    });
  });
};

export const setRoomValueByIdAsync = async (roomID, roomData) => {
  await setRoomValueByRefAsync(getRoomReference(roomID), roomData);
};

/* end of rooms api */

/* battles api */

export const getBattlesReference = _ => {
  return getDatabase().ref(BATTLE_KEY_PREFIX);
};

export const getBattleReference = battleID => {
  return getDatabase().ref(BATTLE_KEY_PREFIX + battleID);
};

export const setBattleValueByRefAsync = (battleRef, battleData) => {
  return new Promise((res, rej) => {
    battleRef.set(battleData, error => {
      if (error) {
        rej(error);
        return;
      }
      res();
    });
  });
};

export const setBattleValueByIdAsync = async (battleID, battleData) => {
  await setBattleValueByRefAsync(getBattleReference(battleID), battleData);
};

/* end of battles api */

/* other utils */

export const currentDateTimeString = _ => {
  return dayjs().format(dateTimeFormat);
};

/* end of other utils */
