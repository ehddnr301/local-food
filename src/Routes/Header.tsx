import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 10vh;
  font-family: "Jua", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  background-color: #2ecc71;
  color: white;
`;

const Nav = styled.div`
  font-size: 42px;
`;

const Title = styled.div`
  font-size: 48px;
`;

const Header = () => {
  return (
    <Container>
      <Title>로컬푸드</Title>
      <Nav>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        </svg>
      </Nav>
    </Container>
  );
};

export default Header;
