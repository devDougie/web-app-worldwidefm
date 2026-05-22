import { Injectable, signal, computed } from '@angular/core';
import { Radio } from '../../shared/models/radio.model';

const STORAGE_KEY = 'wwfm_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private _favorites = signal<Radio[]>(this.loadFromStorage());

    readonly favorites = this._favorites.asReadonly();
    readonly count = computed(() => this._favorites().length);

    private loadFromStorage(): Radio[] {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    }

    isFavorite(stationuuid: string): boolean {
        return this._favorites().some(r => r.stationuuid === stationuuid);
    }

    toggle(radio: Radio): void {
        const current = this._favorites();
        if (this.isFavorite(radio.stationuuid)) {
            this._favorites.set(current.filter(r => r.stationuuid !== radio.stationuuid));
        } else {
            this._favorites.set([...current, radio]);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._favorites()));
    }
}