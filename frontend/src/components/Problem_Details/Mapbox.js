import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Box, Button } from "@chakra-ui/react";

const Mapbox = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [longitude, setlongitude] = useState(77.126126);
  const [latitude, setlatitude] = useState(13.327186);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGhhbnRvbTg4NyIsImEiOiJjbGdmYXZtdnEwczljM21tZjd2NXMwaXUyIn0.NHVY0Me8sNh2A8n9LFV3ew";

    const initializeMap = ({ setMap, setMarker }) => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [77.126126, 13.327186],
        zoom: 12.5,
      });

      const marker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([77.126126, 13.327186])
        .addTo(map);

      function onDragEnd() {
        const lngLat = marker.getLngLat();
        localStorage.setItem("latitude", lngLat.lat);
        localStorage.setItem("longitude", lngLat.lng);
        setlongitude(lngLat.lng);
        setlatitude(lngLat.lat);
        console.log(
          `Longitude: ${localStorage.getItem(
            "longitude"
          )}, Latitude: ${localStorage.getItem("latitude")}`
        );
      }

      marker.on("dragend", onDragEnd);

      setMap(map);
      setMarker(marker);
    };

    if (!map) {
      initializeMap({ setMap, setMarker });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  useEffect(() => {
    if (map) {
      const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          map.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 15,
          });
        });
      };

      const currentLocationControl = new mapboxgl.NavigationControl({
        showCompass: false,
      });
      currentLocationControl.onAdd = function (map) {
        const container = document.createElement("div");
        container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";

        const currentLocationButton = document.createElement("button");
        currentLocationButton.className =
          "mapboxgl-ctrl-icon mapboxgl-ctrl-current-location";
        currentLocationButton.title = "Current Location";
        currentLocationButton.onclick = getCurrentLocation;

        container.appendChild(currentLocationButton);

        return container;
      };

      map.addControl(currentLocationControl, "bottom-left");
    }
  }, [map]);
  return (
    <>
      <style>
        {`.map-container {
            position: center;
            bottom: 0;
            width: 25rem;
            height:20rem;
          
          }
        
          .coordinates {
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            position: absolute;
            bottom: 40px;
            left: 10px;
            padding: 5px 10px;
            margin: 0;
            font-size: 11px;
            line-height: 18px;
            border-radius: 3px;
            display: none;
          }`}
      </style>
      <div id="map" className="map-container"></div>
      <pre className="coordinates"></pre>
    </>
  );
};

export default Mapbox;
