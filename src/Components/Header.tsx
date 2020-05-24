import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 10vh;
  font-family: "Jua", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 100px;
  background-color: #2ecc71;
  color: white;
`;

const Nav = styled.div`
  font-size: 42px;
  display: flex;
  div {
    margin-right: 10px;
  }
`;

const Title = styled.div`
  font-size: 48px;
`;

const Header = (): JSX.Element => {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    function getUserInfo() {
      const user = localStorage.getItem("user");
      if (user) {
        setIsUser(true);
      }
    }
    getUserInfo();
  });
  return (
    <Container>
      <Title>
        <Link to="/">로컬푸드</Link>
      </Title>
      <Nav>
        <Link to="/info">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <path d="M5.495 2h16.505v-2h-17c-1.656 0-3 1.343-3 3v18c0 1.657 1.344 3 3 3h17v-20h-16.505c-1.376 0-1.376-2 0-2zm.505 4h14v16h-14v-16zm8.084 11.958c0 .575-.466 1.042-1.042 1.042-.573 0-1.04-.467-1.04-1.042 0-.576.467-1.042 1.04-1.042.576.001 1.042.467 1.042 1.042zm-1.008-8.958c-1.68 0-2.942 1.122-2.942 3.333h1.648c0-.96.377-1.746 1.26-1.746.52 0 1.07.345 1.118 1.004.051.694-.319 1.046-.788 1.493-1.219 1.158-1.174 1.688-1.174 2.999h1.644c0-.605-.066-1.045.766-1.941.554-.598 1.244-1.342 1.259-2.477.019-1.65-1.147-2.665-2.791-2.665z" />
            </svg>
          </div>
        </Link>
        {isUser ? (
          <>
            <Link to="/profile">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
                </svg>
              </div>
            </Link>
            <Link to="/moreStore">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
              </div>
            </Link>
          </>
        ) : null}
      </Nav>
    </Container>
  );
};

export default Header;
