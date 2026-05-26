import { Injectable, signal, computed } from '@angular/core';
import { Radio } from '../../shared/models/radio.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();

  private _currentRadio = signal<Radio | null>(null);
  private _isPlaying = signal<boolean>(false);
  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);
  private _volume = signal<number>(0.8);
  private _isMixedContent = signal<boolean>(false);

  readonly currentRadio = this._currentRadio.asReadonly();
  readonly isPlaying = this._isPlaying.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._hasError.asReadonly();
  readonly volume = this._volume.asReadonly();
  readonly isMixedContent = this._isMixedContent.asReadonly();

  constructor() {
    this.audio.volume = this._volume();

    this.audio.addEventListener('playing', () => {
      this._isPlaying.set(true);
      this._isLoading.set(false);
      this._hasError.set(false);
    });

    this.audio.addEventListener('waiting', () => {
      this._isLoading.set(true);
    });

    this.audio.addEventListener('error', () => {
      this._isPlaying.set(false);
      this._isLoading.set(false);
      this._hasError.set(true);
    });

    this.audio.addEventListener('pause', () => {
      this._isPlaying.set(false);
    });
  }

  play(radio: Radio): void {
    if (this._currentRadio()?.stationuuid === radio.stationuuid) {
      if (this._isPlaying()) {
        this.pause();
      } else {
        this.audio.play();
      }
      return;
    }

    const isMixed = radio.urlResolved?.startsWith('http://');
    this._isMixedContent.set(isMixed);

    this.audio.pause();
    this._currentRadio.set(radio);
    this._isPlaying.set(false);
    this._isLoading.set(true);
    this._hasError.set(false);
    this.audio.src = radio.urlResolved;
    this.audio.load();
    this.audio.play().catch(() => {
      this._hasError.set(true);
      this._isLoading.set(false);
    });
  }

  pause(): void {
    this.audio.pause();
  }

  resume(): void {
    this.audio.play();
  }

  setVolume(value: number): void {
    const clamped = Math.max(0, Math.min(1, value));
    this._volume.set(clamped);
    this.audio.volume = clamped;
  }
}