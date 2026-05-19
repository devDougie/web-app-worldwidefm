import { Component } from '@angular/core';
import { Map as MapView } from './features/map/map.component';
import { PlayerComponent } from './features/player/player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapView, PlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {}