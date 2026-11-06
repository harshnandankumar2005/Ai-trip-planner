import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ExternalLink, Navigation, MapPin } from 'lucide-react';

export default function MapView({ locations = [], center = [13.6288, 79.4192], destinationName = '' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCenter = locations.length > 0 ? [locations[0].lat, locations[0].lng] : center;
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 13,
        scrollWheelZoom: false,
      });

      // Dark Matter CartoDB tiles for gorgeous dark mode consistency
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    if (locations && locations.length > 0) {
      const points = [];

      locations.forEach((loc, index) => {
        if (!loc.lat || !loc.lng) return;
        const latLng = [loc.lat, loc.lng];
        points.push(latLng);

        // Custom styled glowing marker in Dark Theme
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div style="
              background: linear-gradient(135deg, #7C5CFC 0%, #22D3EE 100%);
              color: white;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              font-size: 13px;
              border: 2px solid #F8FAFC;
              box-shadow: 0 0 15px rgba(124, 92, 252, 0.7);
            ">
              ${index + 1}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; padding: 6px; max-width: 250px; color: #F8FAFC;">
            <div style="font-size: 10px; text-transform: uppercase; font-weight: 800; color: #22D3EE; margin-bottom: 2px;">
              Stop #${index + 1} • Day ${loc.day || 1}
            </div>
            <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 800; color: #F8FAFC;">
              ${loc.name}
            </h4>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #94A3B8; line-height: 1.4;">
              ${loc.description || ''}
            </p>
            ${loc.duration ? `<div style="font-size: 11px; color: #A78BFA; margin-bottom: 8px;">⏱️ Duration: ${loc.duration}</div>` : ''}
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ', ' + destinationName)}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: white; background: linear-gradient(135deg, #7C5CFC, #22D3EE); padding: 6px 12px; border-radius: 8px; text-decoration: none;">
              Open in Google Maps ↗
            </a>
          </div>
        `;

        const marker = L.marker(latLng, { icon: customIcon }).bindPopup(popupContent);
        layer.addLayer(marker);
      });

      // Draw polyline connecting spots in order
      if (points.length > 1) {
        const polyline = L.polyline(points, {
          color: '#22D3EE',
          weight: 3.5,
          opacity: 0.85,
          dashArray: '6, 8',
          lineJoin: 'round',
        });
        layer.addLayer(polyline);

        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      } else if (points.length === 1) {
        map.setView(points[0], 14);
      }
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [locations, center, destinationName]);

  const googleMapsRouteUrl = locations.length > 0
    ? `https://www.google.com/maps/dir/${locations.map(l => encodeURIComponent(l.name)).join('/')}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationName || 'India')}`;

  return (
    <div className="bg-[#141C2E] rounded-3xl shadow-xl shadow-black/40 border border-white/10 overflow-hidden flex flex-col h-full">
      <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-[#0E1422]/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent-primary/20 text-accent-highlight flex items-center justify-center border border-accent-primary/30">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Interactive Route Map</h3>
            <p className="text-xs text-slate-400">
              {locations.length} destination stops plotted with routes
            </p>
          </div>
        </div>

        <a
          href={googleMapsRouteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-cyan bg-white/5 border border-accent-cyan/30 rounded-xl hover:bg-accent-cyan/10 transition shadow-xs"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="relative flex-1 min-h-[420px] w-full">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="p-3.5 bg-[#0E1422] border-t border-white/5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 font-medium">
        <span className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
          Numbered glowing pins indicate visiting sequence
        </span>
        <span className="text-slate-500">Click any marker to open directions</span>
      </div>
    </div>
  );
}
