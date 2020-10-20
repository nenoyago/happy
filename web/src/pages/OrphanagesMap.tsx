import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';
import checkNightMode from '../utils/mapColor';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap = () => {
  const [mapColor, setMapColor] = useState('light');
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  function checkMapColor() {
    const color = checkNightMode();
    setMapColor(color);
  };

  useEffect(() => {
    checkMapColor();
  }, []);

  async function getOrphanages() {
    try {
      const response = await api.get('orphanages');
      setOrphanages(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getOrphanages();
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio de Janeiro</strong>
          <span>Abolição</span>
        </footer>
      </aside>

      {/* <button type="button" onClick={changeMapColor}
        className={`change-map-color ${mapColor.includes('light') ? 'change-map-color-light' : 'change-map-color-dark'}`}>
        <FiMoon size={32} color={mapColor.includes('light') ? '#242424' : '#FFF'} />
      </button> */}

      <Map
        center={[-22.8990263, -43.2822862]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapColor}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
