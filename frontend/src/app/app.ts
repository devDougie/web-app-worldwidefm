import { Component, ViewChild } from '@angular/core';
import { Map as MapView } from './features/map/map.component';
import { PlayerComponent } from './features/player/player.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { HeaderComponent } from './features/header/header.component';
import { Radio } from './shared/models/radio.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapView, PlayerComponent, SidebarComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  @ViewChild(MapView) mapComponent!: MapView;

  onNavigateTo(radio: Radio): void {
    this.mapComponent?.navigateToRadio(radio);
  }
}