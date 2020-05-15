import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import Loading from "../Components/Loading";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
`;

const UserDetail = styled.div``;

const ProfileImage = styled.img``;

const Username = styled.div``;

const Email = styled.div``;

interface IUserInfo {
  email: string;
  username: string;
  avatarUrl: string;
}

const Profile = (props): JSX.Element => {
  let userId = "";
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  if (props.state.length === 1) {
    userId = props.state[0].userInfo.id;
  }

  useEffect(() => {
    async function getUserInfo() {
      const {
        data: { email, username, avatarUrl },
      } = await axios.post(`http://localhost:4000/user/me`, { userId });
      setUserInfo({ email, username, avatarUrl });
    }
    getUserInfo();
  }, []);
  return (
    <Container>
      {userInfo ? (
        userInfo && (
          <UserDetail>
            <ProfileImage src={userInfo.avatarUrl}></ProfileImage>
            <Username>{userInfo.username}</Username>
            <Email>{userInfo.email}</Email>
          </UserDetail>
        )
      ) : (
        <Loading></Loading>
      )}
    </Container>
  );
};

const mapStateToProp = (state, ownProps) => {
  return { state };
};

export default connect(mapStateToProp)(Profile);
