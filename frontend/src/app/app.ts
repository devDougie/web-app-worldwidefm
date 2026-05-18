import { Component } from '@angular/core';
import { Map as MapView } from './features/map/map/map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {}