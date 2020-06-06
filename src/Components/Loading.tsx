import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes` {
    from {
        transform: rotate(0deg);
    }
    to { 
        transform: rotate(360deg);
    }
}
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  margin: 110px auto 0;
  border: solid 10px #8822aa;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transition: all 0.5s ease-in;
  animation: ${rotate} 1s linear infinite;
`;

export default () => <Loading></Loading>;
