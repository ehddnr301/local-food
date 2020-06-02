import React, { useEffect } from "react";
import styled from "styled-components";
import backgroundLogin from "../Images/backgroundLogin.jpg";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background-image: url(${backgroundLogin});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Wrapper = styled.div`
  position: relative;
  width: 27%;
  height: 35%;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 5% 5% 0 0;
  padding: 1%;
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 44px;
  color: white;
`;

const ButtonWrapper = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  width: 100%;
  a {
    width: 100%;
    display: flex;
    justify-content: center;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const Button = styled.div`
  padding: 10px 30px;
  background-color: white;
  border-radius: 10px;
  font-size: 24px;
  width: 60%;
  text-align: center;
  color: #2ecc71;
`;

const Icon = styled.div`
  position: absolute;
  width: 100%;
  height: 48px;
  top: 3%;
  right: 3%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icons = styled.div`
  font-size: 40px;
  margin-left: 10px;
  padding: 0 10px;
  color: #f7c447;
  border: 5px solid #f7c447;
  border-radius: 50%;
`;

const Login = (): JSX.Element => {
  return (
    <Container>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <Wrapper>
        <Title>함께하기</Title>
        <ButtonWrapper>
          <a
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_CALLBACK}&response_type=code`}
          >
            <Button>카카오톡</Button>
          </a>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GH_ID}&redirect_uri=${process.env.REACT_APP_GH_CALLBACK}&scope=read:user`}
          >
            <Button>깃허브</Button>
          </a>
          <a
            href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_CALLBACK}&scope=${process.env.REACT_APP_GOOGLE_SCOPE}&response_type=code`}
          >
            <Button>구글</Button>
          </a>
        </ButtonWrapper>
        <Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="#F7C447"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <Icons>
            <span> K</span>
          </Icons>
          <Icons>
            <span>G</span>
          </Icons>
        </Icon>
      </Wrapper>
    </Container>
  );
};

export default Login;
