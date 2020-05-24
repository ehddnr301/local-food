import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import axios from "axios";

const NaverMapTag = styled(NaverMap)`
  width: 100%;
  height: 100%;
`;

const NMap = () => {
  const [store, setStore] = useState(null);

  const didMount = async () => {
    const { data } = await axios.get("http://localhost:4000/store/list/all");
    console.log(data);
    const storeInfo = data.filter((d) => d.xCoordinate !== 0);
    console.log(storeInfo);
    setStore(storeInfo);
  };
  useEffect(() => {
    didMount();
  }, []);
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NAVER_CLIENT}
      >
        <NaverMapTag
          id="maps-examples-marker"
          defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
          defaultZoom={10}
        >
          <Marker
            position={{ lat: 37.3595704, lng: 127.105399 }}
            onClick={() => {
              alert("여기는 네이버 입니다.");
            }}
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
