/**
 * High-quality Web Audio API romantic wedding melody generator.
 * Produces soft, resonant acoustic piano chords and warm ambient harmonic pads.
 * Guarantees zero broken external audio URLs or latency issues.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.55;
  private step: number = 0;

  // Romantic progression in D Major (Canon / Wedding Hymn inspired)
  private chords = [
    // D Major
    { bass: 146.83, notes: [293.66, 369.99, 440.0, 587.33] }, // D4, F#4, A4, D5
    // A Major
    { bass: 110.0, notes: [277.18, 329.63, 440.0, 554.37] },  // C#4, E4, A4, C#5
    // B Minor
    { bass: 123.47, notes: [246.94, 293.66, 369.99, 493.88] }, // B3, D4, F#4, B4
    // F# Minor
    { bass: 92.5, notes: [277.18, 369.99, 440.0, 554.37] },   // C#4, F#4, A4, C#5
    // G Major
    { bass: 98.0, notes: [293.66, 392.0, 493.88, 587.33] },   // D4, G4, B4, D5
    // D Major
    { bass: 146.83, notes: [293.66, 369.99, 440.0, 587.33] }, // D4, F#4, A4, D5
    // G Major
    { bass: 98.0, notes: [293.66, 392.0, 493.88, 587.33] },   // D4, G4, B4, D5
    // A Major Suspended to Major
    { bass: 110.0, notes: [293.66, 329.63, 440.0, 659.25] }, // D4, E4, A4, E5
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private playPianoNote(freq: number, time: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator for rich piano harmonic resonance
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.002, time); // Subtle warm chorusing

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(350, time + duration);

    // Piano envelope: sharp gentle attack, natural long decay
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.45, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.15, time + 0.6);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  private playWarmPad(bassFreq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const padGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(bassFreq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, time);

    padGain.gain.setValueAtTime(0.0001, time);
    padGain.gain.linearRampToValueAtTime(0.22, time + 0.8);
    padGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(padGain);
    padGain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  public start() {
    if (this.isPlaying) return;
    const ctx = this.getAudioContext();
    this.isPlaying = true;

    const playCycle = () => {
      if (!this.isPlaying || !this.ctx) return;

      const now = this.ctx.currentTime;
      const currentChord = this.chords[this.step % this.chords.length];
      const chordDuration = 3.6;

      // Play soft bass tone
      this.playWarmPad(currentChord.bass, now, chordDuration);

      // Play arpeggiated piano notes in the chord
      currentChord.notes.forEach((freq, idx) => {
        const noteTime = now + (idx * 0.42);
        this.playPianoNote(freq, noteTime, 2.4, 0.45);
      });

      // Additional higher melodic sparkle
      const highNote = currentChord.notes[(this.step * 2) % currentChord.notes.length] * 1.5;
      this.playPianoNote(highNote, now + 1.8, 1.8, 0.28);

      this.step++;
      this.timerId = window.setTimeout(playCycle, chordDuration * 1000);
    };

    playCycle();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

export const weddingAudio = new WeddingAudioManager();
