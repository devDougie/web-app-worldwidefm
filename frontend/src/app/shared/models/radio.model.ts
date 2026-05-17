export interface Radio {
  stationuuid: string;
  name: string;
  country: string;
  city: string;
  tags: string;
  urlResolved: string;
  latitude: number;
  longitude: number;
  bitrate: number;
  codec: string;
  favicon: string;
}