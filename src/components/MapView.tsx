import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})


export default function MapView({ lat, lng, label }: { lat?: number | null; lng?: number | null; label?: string }) {
if (!lat || !lng) return <div className="card small">No coordinates yet.</div>
return (
<div className="map">
<MapContainer center={[lat, lng]} zoom={10} style={{height:'100%'}}>
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
<Marker position={[lat, lng]}>
<Popup>{label ?? `${lat}, ${lng}`}</Popup>
</Marker>
</MapContainer>
</div>
)
}