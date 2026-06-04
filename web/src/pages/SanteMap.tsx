import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../lib/api'

export default function SanteMap(){
  const [fac, setFac] = useState<any[]>([])
  useEffect(()=>{ api.get('/facilities').then(r=>setFac(r.data)).catch(()=>{}) }, [])
  return (
    <div className="p-4">
      <h2>Carte santé</h2>
      <div style={{height: '60vh'}}>
        <MapContainer center={[14.6928, -17.4467]} zoom={12} style={{height:'100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {fac.map(f=> (
            <Marker key={f.id} position={[f.latitude || 14.6928, f.longitude || -17.4467]}>
              <Popup>
                <div>
                  <strong>{f.name}</strong>
                  <div>{f.address}</div>
                  <div>{f.phone}</div>
                  <a href={`/dashboard?facility=${f.id}`}>Prendre RDV</a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
