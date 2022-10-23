import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { HeatmapLayer } from '@react-google-maps/api';
import { Spinner } from "@chakra-ui/react";
import styles from '../styles/Map.module.css';
import useLocations from "../hooks/useLocations";
import { libs } from "./utils";

interface Location {
  latitude: number;
  longitude: number;
}

const Maptwo: NextPage = () => {

  const libraries = ['visualization'];

  const { data, isLoading } = useLocations();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: libs
  });

  const heatMapData = data?.locations.map((location: Location) => {
    return new window.google.maps.LatLng(location.latitude, location.longitude)
  })

  const loaded = () => {
    console.log("Loaded?")
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>{isLoaded && (
      <GoogleMap zoom={2} center={{
        lat: 37.782, lng: -122.447
      }} mapContainerClassName={styles.container}>

        <HeatmapLayer
          onLoad={loaded}
          data={[
            new google.maps.LatLng(37.782, -122.447),
            new google.maps.LatLng(37.782, -122.445),
            new google.maps.LatLng(37.782, -122.443),
            new google.maps.LatLng(37.782, -122.441),
            new google.maps.LatLng(37.782, -122.439),
            new google.maps.LatLng(37.782, -122.437),
            new google.maps.LatLng(37.782, -122.435),
            new google.maps.LatLng(37.785, -122.447),
            new google.maps.LatLng(37.785, -122.445),
            new google.maps.LatLng(37.785, -122.443),
            new google.maps.LatLng(37.785, -122.441),
            new google.maps.LatLng(37.785, -122.439),
            new google.maps.LatLng(37.785, -122.437),
            new google.maps.LatLng(37.785, -122.435)
          ]} />
      </GoogleMap>)}
    </>
  )
}

export default Maptwo;