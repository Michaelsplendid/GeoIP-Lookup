import React from 'react';
import type { IpstackResponse } from '../types/ipstack';

export default function GeoCard({ data }: { data: IpstackResponse | null }) {
  if (!data) return <div className="card small">No data yet — perform a lookup.</div>;

  // Destructure the necessary fields
  const { latitude, longitude, region_name, country_name, zip, city, connection, location } = data;
  
  const isp = connection?.isp || 'N/A';
  const timezone = location?.timezone?.id || 'N/A';
  const currentTime = location?.timezone?.current_time || 'N/A';

  return (
    <div className="card">
      <h2 style={{ margin: 0 }}>
        {data.ip} <span className="small">{city ? `— ${city}` : ''}</span>
      </h2>
      <p className="small">{[region_name, country_name].filter(Boolean).join(', ')} · {zip}</p>
      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        <div>
          <div className="small">Coordinates</div>
          <div>{latitude ?? '—'}, {longitude ?? '—'}</div>
        </div>
        <div>
          <div className="small">ISP</div>
          <div>{isp}</div>
        </div>
        <div>
          <div className="small">Timezone</div>
          <div>{timezone}</div>
        </div>
        <div>
          <div className="small">Time</div>
          <div>{currentTime}</div>
        </div>
      </div>
    </div>
  );
}