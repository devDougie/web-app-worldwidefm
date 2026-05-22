import { Component, inject, output } from '@angular/core';
import { RadioInfoComponent } from '../radio-info/radio-info.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { Radio } from '../../shared/models/radio.model';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RadioInfoComponent, FavoritesComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
    readonly navigateTo = output<Radio>();

    onNavigate(radio: Radio): void {
        this.navigateTo.emit(radio);
    }
}