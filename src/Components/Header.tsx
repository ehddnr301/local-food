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
                width="48"
                height="48"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
              >
                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
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
