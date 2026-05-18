import { Component, OnInit, OnDestroy } from '@angular/core';
import { RadioService } from '../../../core/services/radio.service';
import { Radio } from '../../../shared/models/radio.model';

declare const L: any;  // ← usa o L do CDN via window

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class Map implements OnInit, OnDestroy {

  private map!: any;
  private radios: Radio[] = [];
  private markerCluster!: any;

  constructor(private radioService: RadioService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadAllRadios();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 3,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 2,
      maxZoom: 14
    }).addTo(this.map);

    this.markerCluster = L.markerClusterGroup();
    this.map.addLayer(this.markerCluster);

    this.locateUser();
  }

  private locateUser(): void {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.map.setView([latitude, longitude], 6);
      },
      () => { }
    );
  }

  private loadAllRadios(): void {
    this.radioService.getAllRadios().subscribe({
      next: (data: Radio[]) => {
        this.radios = data;
        this.renderMarkers();
        console.log(`Total de rádios carregadas: ${data.length}`);
      },
      error: (err: any) => {
        console.error('Erro ao carregar rádios:', err);
      }
    });
  }

  private renderMarkers(): void {
    this.markerCluster.clearLayers();

    this.radios.forEach(radio => {
      if (!radio.latitude || !radio.longitude) return;

      const icon = L.divIcon({
        html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
          <circle cx="12" cy="12" r="10" fill="#e63946" stroke="#fff" stroke-width="2"/>
          <line x1="12" y1="4" x2="12" y2="14" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <line x1="8" y1="7" x2="12" y2="4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="16" y1="7" x2="12" y2="4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="12" cy="15" r="1.5" fill="#fff"/>
        </svg>
      `,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([radio.latitude, radio.longitude], { icon });
      marker.bindTooltip(radio.name, { permanent: false, direction: 'top' });
      marker.on('click', () => {
        console.log('Rádio selecionada:', radio.name, radio.stationuuid);
      });
      this.markerCluster.addLayer(marker);
    });

    console.log(`Marcadores renderizados: ${this.radios.length}`);
  }
}