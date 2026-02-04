class SettingsMenu extends SelectionMenu{
  constructor(_x, _y, _keyH, _mouseH, _soundHandler) {
    super(_x,_y,[
      "Back",
      "",
      "SFX Volume: 8",
      "Music Volume: 8",
      "",
      "[Increase SFX Volume]",
      "[Decrease SFX Volume]",
      "",
      "[Increase Music Volume]",
      "[Decrease Music Volume]",
    ],_keyH,_mouseH);

    this.selections[2] = "SFX Volume: " + g_sfx_volume;
    this.selections[3] = "Music Volume: " + g_music_volume;

    this.soundHandler = _soundHandler;
  }

  update(){
    let result = super.update();

    switch(result){
      case 0:
      document.cookie = "musicVol="+g_music_volume+"; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
      document.cookie = "sfxVol="+g_sfx_volume+"; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
      break;
      case 5:
      if(g_sfx_volume < 10){
        g_sfx_volume += 1;
      }
      this.selections[2] = "SFX Volume: " + g_sfx_volume;
      g_sfxGainNode.gain.value = g_sfx_volume / 10;
      this.soundHandler.playSound("fizz", 1);
      break;
      case 6:
      if(g_sfx_volume > 0){
        g_sfx_volume -= 1;
      }
      this.selections[2] = "SFX Volume: " + g_sfx_volume;
      g_sfxGainNode.gain.value = g_sfx_volume / 10;
      this.soundHandler.playSound("fizz", 1);
      break;
      case 8:
      if(g_music_volume < 10){
        g_music_volume += 1;
      }
      this.selections[3] = "Music Volume: " + g_music_volume;
      g_musicGainNode.gain.value = g_music_volume / 10;
      break;
      case 9:
      if(g_music_volume > 0){
        g_music_volume -= 1;
      }
      this.selections[3] = "Music Volume: " + g_music_volume;
      g_musicGainNode.gain.value = g_music_volume / 10;
      break;
    }

    return result;
  }
}
