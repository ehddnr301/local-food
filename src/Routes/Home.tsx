import React from "react";
import styled from "styled-components";
import NMap from "../Components/NMap";

declare global {
  interface Window {
    naver: any;
  }
}

const Container = styled.div`
  width: 100vw;
  height: 90vh;
`;

const Home = (): JSX.Element => {
  return (
    <Container>
      <NMap />
    </Container>
  );
};

export default Home;
