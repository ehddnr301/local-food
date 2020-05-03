import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
`;

const Title = styled.div`
  font-size: 100px;
  margin-bottom: 30px;
`;

const P = styled.div`
  font-size: 48px;
`;

const Err = (): JSX.Element => {
  return (
    <Container>
      <Title>Oops!</Title>
      <P>I think something wrong</P>
      <P>Can you try again?</P>
    </Container>
  );
};

export default Err;
