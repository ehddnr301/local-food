import React from "react";
import styled from "styled-components";
import NMap from "../Components/NMap";
import { connect } from "react-redux";

declare global {
  interface Window {
    naver: any;
  }
}

const Container = styled.div`
  width: 100vw;
  height: 90vh;
`;

const Home = (props): JSX.Element => {
  return (
    <Container>
      <NMap />
    </Container>
  );
};

const mapStateToProp = (state, ownProps) => {
  return { state };
};

export default connect(mapStateToProp)(Home);
