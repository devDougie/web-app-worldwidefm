import { Component, inject, output, signal, computed } from '@angular/core';
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

    readonly navigateTo = output<Radio>();

    protected searchQuery = signal('');

    protected filteredFavorites = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        if (!query) return this.favorites.favorites();
        return this.favorites.favorites().filter(r =>
            r.name.toLowerCase().includes(query)
        );
    });

    playAndNavigate(radio: Radio): void {
        this.audio.play(radio);
        this.navigateTo.emit(radio);
    }
}