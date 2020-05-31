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

const Header = (props): JSX.Element => {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    function getUserInfo() {
      const user = localStorage.getItem("user");
      if (props.state[0]) {
        if (props.state[0].isLoggedIn === false) {
          setIsUser(false);
        }
      }
      if (user || (props.state[0] && props.state[0].isLoggedIn === 1)) {
        setIsUser(true);
      }
    }
    getUserInfo();
  }, [props]);

  return (
    <Container>
      <Title>
        <Link to="/">로컬푸드</Link>
      </Title>
      <Nav>
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
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 2c1.695 1.942 2.371 3 4 3h13v17h-24v-20h7zm6 11v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
                </svg>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M8.612 2l1.55 1.548-4.224 4.12 9.291 9.291 4.222-4.12 1.549 1.549v-12.388h-12.388zm7.388 7c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm-4.271 7.271l-1.729 1.729h-2v2h-2v2h-6v-1.293l6.813-6.915-.657-.651-6.156 6.152v-2.293l6.219-6.203 5.51 5.474zm10.979-10.979l-.708.708v3.097l2-2.065-1.292-1.74z" />
              </svg>
            </div>
          </Link>
        )}
      </Nav>
    </Container>
  );
};

const mapStateToProp = (state) => {
  return { state };
};

export default connect(mapStateToProp)(Header);
