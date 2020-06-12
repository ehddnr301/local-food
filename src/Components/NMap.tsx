import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import MarkerIcon from "./MarkerIcon";
// TODO : react-naver-maps 가 InfoView를 지원하지않아서 modal창으로 해야할듯함
const NaverMapTag = styled(NaverMap)`
  width: 100%;
  height: 100%;
`;

const NMap = () => {
  const [store, setStore] = useState(null);
  const [currentGeo, setCurrentGeo] = useState({
    lat: localStorage.getItem("currentLat") || 37.5665,
    lng: localStorage.getItem("currentLng") || 126.978,
  });

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
  const toggleLike = async (store) => {
    const userId = localStorage.getItem("user");
    try {
      const { status, data } = await axios.post(
        "http://localhost:4000/store/toggleLike",
        {
          store,
          userId,
        }
      );
      console.log(status, data);
      if (status === 200) {
        if (data === "IN") {
          alert("목록에 추가하였습니다.");
        } else {
          alert("목록에서 제거하였습니다.");
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
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
                  toggleLike(s);
                }}
              />
            ))}
        </NaverMapTag>
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default NMap;
