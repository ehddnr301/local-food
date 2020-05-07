import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
`;

const UserDetail = styled.div``;

const Profile = (props): JSX.Element => {
  let userId = "";
  if (props.state.length === 1) {
    userId = props.state[0].userInfo.id;
  }

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await axios.get(`http://localhost:4000/user/${userId}`);
      console.log(userInfo);
    }
    getUserInfo();
  });
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
