class SoundManager {
  private ctx: AudioContext | null = null;
  public musicEnabled: boolean = false;
  public sfxEnabled: boolean = true;
  private musicInterval: any = null;
  private currentMelodyStep: number = 0;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft musical notes for Happy Birthday tune and magical arpeggios
  private noteFreq(name: string): number {
    const notes: Record<string, number> = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C6': 1046.50
    };
    return notes[name] || 440;
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.3, gainVal: number = 0.15) {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }

  public playTwinkle() {
    if (!this.sfxEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.4, 0.1);
      }, idx * 60);
    });
  }

  public playPop() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  public playSparkle() {
    if (!this.sfxEnabled) return;
    const notes = [659.25, 783.99, 880.00, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.25, 0.08);
      }, idx * 45);
    });
  }

  public playDoorOpen() {
    if (!this.sfxEnabled) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.5, 0.12);
      }, idx * 80);
    });
  }

  public playCandleLit() {
    if (!this.sfxEnabled) return;
    this.playTone(880, 'sine', 0.3, 0.12);
    setTimeout(() => {
      this.playTone(1046.5, 'sine', 0.4, 0.1);
    }, 80);
  }

  public playFanfare() {
    if (!this.sfxEnabled) return;
    const notes = [
      { f: 523.25, d: 0.2, delay: 0 },
      { f: 523.25, d: 0.2, delay: 150 },
      { f: 659.25, d: 0.25, delay: 300 },
      { f: 783.99, d: 0.3, delay: 450 },
      { f: 1046.5, d: 0.8, delay: 650 },
    ];
    notes.forEach((n) => {
      setTimeout(() => {
        this.playTone(n.f, 'triangle', n.d, 0.18);
      }, n.delay);
    });
  }

  public playButterflyCatch() {
    if (!this.sfxEnabled) return;
    const notes = [783.99, 987.77, 1174.66];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.2, 0.08);
      }, idx * 60);
    });
  }

  // Sweet music box theme: Happy Birthday melody on celesta synthesizer
  public toggleMusic(enable?: boolean): boolean {
    this.initCtx();
    if (enable !== undefined) {
      this.musicEnabled = enable;
    } else {
      this.musicEnabled = !this.musicEnabled;
    }

    if (this.musicEnabled) {
      this.startMusicLoop();
    } else {
      this.stopMusicLoop();
    }

    return this.musicEnabled;
  }

  public toggleSfx(): boolean {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }

  private startMusicLoop() {
    this.stopMusicLoop();
    const melody: { note: string; dur: number }[] = [
      { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.3 }, { note: 'D4', dur: 0.6 }, { note: 'C4', dur: 0.6 },
      { note: 'F4', dur: 0.6 }, { note: 'E4', dur: 1.0 },
      { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.3 }, { note: 'D4', dur: 0.6 }, { note: 'C4', dur: 0.6 },
      { note: 'G4', dur: 0.6 }, { note: 'F4', dur: 1.0 },
      { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.3 }, { note: 'C5', dur: 0.6 }, { note: 'A4', dur: 0.6 },
      { note: 'F4', dur: 0.6 }, { note: 'E4', dur: 0.6 }, { note: 'D4', dur: 0.8 },
      { note: 'A#4', dur: 0.3 }, { note: 'A#4', dur: 0.3 }, { note: 'A4', dur: 0.6 }, { note: 'F4', dur: 0.6 },
      { note: 'G4', dur: 0.6 }, { note: 'F4', dur: 1.2 },
    ];

    let index = 0;
    const playNext = () => {
      if (!this.musicEnabled) return;
      const current = melody[index];
      if (current && this.ctx) {
        try {
          const freq = this.noteFreq(current.note);
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + current.dur * 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + current.dur * 1.2);
        } catch {}
      }

      index = (index + 1) % melody.length;
      const nextDelay = current ? current.dur * 700 : 800;
      this.musicInterval = setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  private stopMusicLoop() {
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
