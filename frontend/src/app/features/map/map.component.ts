import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RadioService } from '../../core/services/radio.service';
import { AudioService } from '../../core/services/audio.service';
import { Radio } from '../../shared/models/radio.model';

declare const L: any;

type MarkerMap = globalThis.Map<string, any>;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export class Map implements OnInit, OnDestroy {

  private radioService = inject(RadioService);
  private audioService = inject(AudioService);

  private map!: any;
  private radios: Radio[] = [];
  private markerCluster!: any;
  private activeMarker: any = null;
  private defaultIcon: any;
  private activeIcon: any;
  private markerMap: MarkerMap = new globalThis.Map<string, any>();

  protected isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.initMap();

    this.defaultIcon = L.icon({
      iconUrl: 'icons/radio-marker.png',
      iconSize: [32, 38],
      iconAnchor: [16, 38]
    });

    this.activeIcon = L.icon({
      iconUrl: 'icons/radio-marker-selected.png',
      iconSize: [40, 48],
      iconAnchor: [20, 48]
    });

    this.loadAllRadios();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2.5,
      zoomControl: true,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 120,
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 2.5,
      maxZoom: 14
    }).addTo(this.map);

    const resetControl = L.Control.extend({
      options: { position: 'topleft' },
      onAdd: () => {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        container.style.marginTop = '8px';
        const btn = L.DomUtil.create('a', 'leaflet-control-reset', container);
        btn.innerHTML = '⊙';
        btn.title = 'Reset view';
        btn.href = '#';
        btn.addEventListener('click', () => btn.blur());
        L.DomEvent.on(btn, 'click', (e: Event) => {
          L.DomEvent.preventDefault(e);
          this.map.setView([0, 0], 2.5);
        });
        return container;
      }
    });

    new resetControl().addTo(this.map);

    this.markerCluster = L.markerClusterGroup({ showCoverageOnHover: false });
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
        this.isLoading.set(false);
        console.log(`Total de rádios carregadas: ${data.length}`);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        console.error('Erro ao carregar rádios:', err);
      }
    });
  }

  private renderMarkers(): void {
    this.markerCluster.clearLayers();
    this.markerMap.clear();

    this.radios.forEach(radio => {
      if (!radio.latitude || !radio.longitude) return;

      const marker = L.marker([radio.latitude, radio.longitude], { icon: this.defaultIcon });
      marker.bindTooltip(radio.name, { permanent: false, direction: 'top' });
      marker.on('click', () => {
        if (this.activeMarker) {
          this.activeMarker.setIcon(this.defaultIcon);
        }
        marker.setIcon(this.activeIcon);
        this.activeMarker = marker;
        this.audioService.play(radio);
        this.map.setView([radio.latitude!, radio.longitude!], 6);
      });

      this.markerMap.set(radio.stationuuid, marker);
      this.markerCluster.addLayer(marker);
    });

    console.log(`Marcadores renderizados: ${this.radios.length}`);
  }

  navigateToRadio(radio: Radio): void {
    if (!this.map || !radio.latitude || !radio.longitude) return;

    const marker = this.markerMap.get(radio.stationuuid);
    if (marker) {
      if (this.activeMarker) {
        this.activeMarker.setIcon(this.defaultIcon);
      }
      marker.setIcon(this.activeIcon);
      this.activeMarker = marker;

      this.markerCluster.zoomToShowLayer(marker, () => {
        this.map.setView([radio.latitude!, radio.longitude!], 14);
      });
    }
  }
}