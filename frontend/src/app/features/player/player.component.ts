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

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audio.setVolume(parseFloat(input.value));
  }
}