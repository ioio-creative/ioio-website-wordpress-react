export default function NetworkPlayerData() {
  // things that won't change
  this.CharacterType = -1;
  this.FirstRole = 0;

  // things that will change
  this.CurrentHP = -1;
  this.SelectedDefensiveEffectType = 0;
  this.SelectedOffensiveEffectType = 0;
  this.IsReady = false;
  this.PlayAgainReplyType = 0;
}
