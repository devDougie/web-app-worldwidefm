import { Component, inject } from '@angular/core';
import { AudioService } from '../../core/services/audio.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-radio-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './radio-info.component.html',
    styleUrl: './radio-info.component.scss'
})

export class RadioInfoComponent {
    protected audio = inject(AudioService);
    protected favorites = inject(FavoritesService);
}