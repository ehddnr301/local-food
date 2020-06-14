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
  align-items: center;
  width: 60%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

const UserStore = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(200, 30, 30, 0.4);
`;

const ProfileImage = styled.img`
  width: 27%;
  height: 17%;
  border-radius: 50%;
`;

const Username = styled.div`
  margin-top: 20px;
`;

const Email = styled.div``;

const Logout = styled.button`
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #2ecc71;
  color: #2ecc71;
  text-transform: uppercase;
  width: 100px;
  transition: background-color 0.5s ease, color 1s ease;
  cursor: pointer;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.73);
  &:hover {
    background-color: #2ecc71;
    color: white;
  }
`;

const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  padding: 10px;
`;
const StoreName = styled.div`
  width: 80%;
`;
const StoreType = styled.div`
  width: 80%;
`;
const StoreLocation = styled.div`
  width: 80%;
`;
const StoreDescription = styled.div`
  width: 80%;
`;

interface IUserInfo {
  email: string;
  username: string;
  avatarUrl: string;
}

const Profile = ({ history, dispatch }): JSX.Element => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [userStore, setUserStore] = useState(null);
  const [isUser, setIsUser] = useState(true);

  const onClick = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setUserInfo(undefined);
    setIsUser(false);
  };

  const getUserInfo = async () => {
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
  };
  const getUserStore = async () => {
    const userId = localStorage.getItem("user");
    try {
      const { data } = await axios.post(
        `http://localhost:4000/store/list/like`,
        {
          userId,
        }
      );
      console.log(data);
      setUserStore(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserStore();
  }, []);
  return (
    <Container>
      {isUser ? (
        userInfo ? (
          userInfo && (
            <UserDetail>
              <UserInfo>
                <ProfileImage src={userInfo.avatarUrl}></ProfileImage>
                <Username>username : {userInfo.username}</Username>
                <Email>{userInfo.email}</Email>
                <Logout onClick={onClick}>logout</Logout>
              </UserInfo>
              <UserStore>
                {userStore &&
                  userStore.map((s) => (
                    <StoreWrapper>
                      <StoreName>가게이름 : {s.name}</StoreName>
                      <StoreType>종류 : {s.type}</StoreType>
                      <StoreLocation>위치 : {s.location}</StoreLocation>
                      <StoreDescription>
                        설명 : {s.description}
                      </StoreDescription>
                    </StoreWrapper>
                  ))}
              </UserStore>
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
