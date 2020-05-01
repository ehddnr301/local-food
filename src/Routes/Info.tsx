import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70%;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
`;

const Button = styled.button`
  padding: 10px 30px;
`;

const Info = (): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        <Button>카카오톡</Button>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GH_ID}&redirect_uri=${process.env.REACT_APP_GH_CALLBACK}&scope=read:user`}
        >
          <Button>깃허브</Button>
        </a>
      </Wrapper>
    </Container>
  );
};

export default Info;
