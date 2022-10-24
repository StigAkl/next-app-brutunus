import { GoogleMap } from "@react-google-maps/api";
import { HeatmapLayer } from '@react-google-maps/api';
import { useState } from "react";
import useLocations from "../../hooks/useLocations";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 49.68584175026672,
  lng: 13.359960107720635
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
        zoom={10}
      >
        {
          (heatmap && <HeatmapLayer
            data={locations}
            options={
              {
                opacity: 0.3,
                maxIntensity: 1,
              }
            }
          />)
        }
      </GoogleMap>
    </>
  )
}

export default GMap;