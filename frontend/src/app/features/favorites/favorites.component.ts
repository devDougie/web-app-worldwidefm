import { Component, inject, output } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { AudioService } from '../../core/services/audio.service';
import { Radio } from '../../shared/models/radio.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss'
})

export class FavoritesComponent {
    protected favorites = inject(FavoritesService);
    protected audio = inject(AudioService);

    // EventEmitter para notificar o mapa para navegar até a rádio
    readonly navigateTo = output<Radio>();

    playAndNavigate(radio: Radio): void {
        this.audio.play(radio);
        this.navigateTo.emit(radio);
    }
}