import React from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

const NaverMapTag = styled(NaverMap)`
  width: 100%;
  height: 100%;
`;

const NMap = () => {
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
        </NaverMapTag>
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default NMap;
