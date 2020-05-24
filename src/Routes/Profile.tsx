import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { Redirect } from "react-router-dom";

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

const Profile = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [isUser, setIsUser] = useState(true);

  const onClick = () => {
    localStorage.removeItem("user");
    setUserInfo(undefined);
    setIsUser(false);
  };

  useEffect(() => {
    async function getUserInfo() {
      const userId = localStorage.getItem("user");
      const {
        data: { email, username, avatarUrl },
      } = await axios.post(`http://localhost:4000/user/me`, { userId });
      setUserInfo({ email, username, avatarUrl });
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

export default Profile;
