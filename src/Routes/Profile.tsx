import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
`;

const UserDetail = styled.div``;

const Profile = (props): JSX.Element => {
  if (props.state.length === 1) {
    console.log(props.state);
  }
  return (
    <Container>
      <UserDetail></UserDetail>
    </Container>
  );
};

const mapStateToProp = (state, ownProps) => {
  return { state };
};

export default connect(mapStateToProp)(Profile);
