import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { Redirect } from "react-router-dom";
import { logoutUser } from "../Components/Store";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  width: 60%;
  height: 100%;
`;

const ProfileImage = styled.img`
  width: 15%;
  height: 17%;
`;

const Username = styled.div``;

const Email = styled.div``;

interface IUserInfo {
  email: string;
  username: string;
  avatarUrl: string;
}

const Profile = ({ history, dispatch }): JSX.Element => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [isUser, setIsUser] = useState(true);

  const onClick = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setUserInfo(undefined);
    setIsUser(false);
  };

  useEffect(() => {
    async function getUserInfo() {
      const userId = localStorage.getItem("user");
      try {
        const {
          data: { email, username, avatarUrl },
        } = await axios.post(`http://localhost:4000/user/me`, { userId });
        setUserInfo({ email, username, avatarUrl });
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 500) {
          dispatch(logoutUser());
          localStorage.removeItem("user");
          history.push("/");
        }
      }
      // console.log(something);
    }
    getUserInfo();
  }, []);
  return (
    <Container>
      {isUser ? (
        userInfo ? (
          userInfo && (
            <UserDetail>
              <ProfileImage src={userInfo.avatarUrl}></ProfileImage>
              <Username>{userInfo.username}</Username>
              <Email>{userInfo.email}</Email>
              <button onClick={onClick}>logout</button>
            </UserDetail>
          )
        ) : (
          <Loading></Loading>
        )
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </Container>
  );
};

const mapDispatchToProp = (dispatch) => {
  return { dispatch };
};

export default connect(null, mapDispatchToProp)(Profile);
