import React from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import NMap from "../Components/NMap";

declare global {
  interface Window {
    naver: any;
  }
}

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: black;
`;

const Home = (): JSX.Element => {
  return <NMap />;
};

export default Home;
