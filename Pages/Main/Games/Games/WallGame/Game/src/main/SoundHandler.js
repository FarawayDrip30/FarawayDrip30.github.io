
class SoundHandler {

	constructor(sounds) {
	  this.sources = [null,null,null];


	}

	addSound(path, i) {
	  /*
		try {
			AudioInputStream audioStream = AudioSystem.getAudioInputStream(getClass().getResourceAsStream(path));

			clips[i] = AudioSystem.getClip();
			clips[i].open(audioStream);

		}
		catch (UnsupportedAudioFileException e) {
            System.out.println("The specified audio file format is not supported.");
            e.printStackTrace();
        } catch (LineUnavailableException e) {
            System.out.println("Audio line for playing the sound is unavailable.");
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println("Error occurred while trying to read the audio file.");
            e.printStackTrace();
        }
        */
	}

	playSound(key, id, loops=false) {
	  this.sources[id] = g_audioContext.createBufferSource();
		this.sources[id].buffer = g_sounds[key];
		//this.sources[id].connect(g_audioContext.destination);

		if(loops){
      this.sources[id].connect(g_musicGainNode);
		}
		else{
		  this.sources[id].connect(g_sfxGainNode);
		}
		this.sources[id].loop = loops
		this.sources[id].start();
	}

	play_and_loop(id) {
	  /*
		clips[id].stop();
		clips[id].setFramePosition(0);
		clips[id].flush();
		clips[id].loop(Clip.LOOP_CONTINUOUSLY);
		*/
	}

	stopSound(id) {
	  this.sources[id].stop();
	}
}
