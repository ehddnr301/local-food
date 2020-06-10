import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import MarkerIcon from "./MarkerIcon";

const NaverMapTag = styled(NaverMap)`
  width: 100%;
  height: 100%;
`;
const icon = {
  content: [
    '<div class="cs_mapbridge">',
    '<div class="map_group _map_group crs">',
    '<div class="map_marker _marker num1 num1_big"> ',
    '<span class="ico _icon"></span>',
    '<span class="shd"></span>',
    "</div>",
    "</div>",
    "</div>",
  ].join(""),
};

const NMap = () => {
  const [store, setStore] = useState(null);
  const [currentGeo, setCurrentGeo] = useState({
    lat: localStorage.getItem("currentLat") || 37.5665,
    lng: localStorage.getItem("currentLng") || 126.978,
  });
  let initialGeo = { lat: 0, lng: 0 };

  const didMount = async () => {
    const { data } = await axios.get("http://localhost:4000/store/list/all");
    console.log(data);
    const storeInfo = data.filter((d) => d.xCoordinate !== 0);
    console.log(storeInfo);
    setStore(storeInfo);
  };

  // * 현재위치
  const successGeo = (pos) => {
    const {
      coords: { latitude, longitude },
    } = pos;
    localStorage.setItem("currentLat", latitude);
    localStorage.setItem("currentLng", longitude);
    setCurrentGeo({ lat: latitude, lng: longitude });
  };
  const errorGeo = (error) => {
    setCurrentGeo({ lat: 37.5665, lng: 126.978 });
  };
  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo, {
      timeout: 10000,
    });
  };
  const toggleLike = (store) => {
    console.log(store);
  };

  useEffect(() => {
    if (currentGeo.lat === 37.5665 && currentGeo.lng === 126.978) {
      currentLocation();
      didMount();
    } else {
      didMount();
    }
  }, [currentGeo]);

  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NAVER_CLIENT}
      >
        <NaverMapTag
          id="maps-examples-marker"
          defaultCenter={{ lat: currentGeo.lat, lng: currentGeo.lng }}
          defaultZoom={18}
        >
          <Marker
            position={{ lat: currentGeo.lat, lng: currentGeo.lng }}
            onClick={() => {
              alert("현위치입니다.");
            }}
            icon={{
              content: ReactDOMServer.renderToString(<MarkerIcon />),
            }}
            animation={2}
          />

          {store &&
            store.map((s) => (
              <Marker
                position={{ lat: s.yCoordinate, lng: s.xCoordinate }}
                key={s._id}
                onClick={() => {
                  alert(`여기는 ${s.storeName} 입니다.`);
                }}
              />
            ))}
        </NaverMapTag>
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default NMap;
