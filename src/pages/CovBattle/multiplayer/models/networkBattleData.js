import {
  INVALID_BATTLE_FIELD_ID,
  currentDateTimeString
} from '../firebaseCommon';
import NetworkPlayerData from './networkPlayerData';

export default function NetworkBattleData() {
  // things that won't change
  this.CreateDT = currentDateTimeString();

  // things that will change
  this.BattleField = INVALID_BATTLE_FIELD_ID;
  this.WindStrength = 0;
  this.AttackStrength = -1;
  this.IsDefenseCompleted = false;
  this.IsOffenseCompleted = false;
  this.HostPlayer = new NetworkPlayerData();
  this.GuestPlayer = new NetworkPlayerData();
}
