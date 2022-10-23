import { GoogleMap } from "@react-google-maps/api";
import { HeatmapLayer } from '@react-google-maps/api';
import { useState } from "react";
import useLocations from "../../hooks/useLocations";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -24.72204,
  lng: 83.54313
};

export interface Location {
  latitude: string;
  longitude: string;
}

const GMap = () => {

  const [heatmap, setHeatmap] = useState<boolean>(false);

  const toggleHeatMap = () => {
    setHeatmap(true);
  }

  const { data } = useLocations();

  let locations = [];

  if (data) {
    locations = data.locations.map((location: Location) => {
      return new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude))
    })
  }

  return (
    <>
      {!heatmap && <button onClick={toggleHeatMap}>Toggle heatmap</button>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        {
          (heatmap && <HeatmapLayer
            data={locations}
            options={
              {
                maxIntensity: 1,
                radius: 3,
                dissipating: true,
                opacity: 0.3
              }
            }
          />)
        }
      </GoogleMap>
    </>
  )
}

export default GMap;