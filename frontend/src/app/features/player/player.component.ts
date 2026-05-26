import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})

export class PlayerComponent {
  readonly audio = inject(AudioService);
  private _prevVolume = 0.8;

  get isMuted(): boolean {
    return this.audio.volume() === 0;
  }

  toggleMute(): void {
    if (this.isMuted) {
      this.audio.setVolume(this._prevVolume);
    } else {
      this._prevVolume = this.audio.volume();
      this.audio.setVolume(0);
    }
  }

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audio.setVolume(parseFloat(input.value));
  }
}