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
  background-color: #3498db;
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
                  fill="white"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                </svg>
              </div>
            </Link>
            <Link to="/moreStore">
              <div>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="white"
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
                fill="white"
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
