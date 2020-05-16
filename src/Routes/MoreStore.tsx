import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import useInput from "../Components/useInput";
import Input from "../Components/Input";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  width: 60%;
  height: 80%;
  background-color: grey;
  display: flex;
`;

const Explain = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid white;
  padding: 30px;
`;

const Form = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    input:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const MoreStore = (props): JSX.Element => {
  let userId = "";
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);

  if (props.state.length === 1) {
    userId = props.state[0].userInfo.id;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    makeStore();
  };
  const makeStore = async () => {
    try {
      setIsSuccess(true);

      await axios.post("http://localhost:4000/store/list", {
        storeName: storeName.value,
        storeType: storeType.value,
        location: location.value,
        description: description.value,
        id: userId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(isSuccess);
    }
  };

  const storeName = useInput("");
  const storeType = useInput("");
  const location = useInput("");
  const description = useInput("");

  return isSuccess ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <FormWrapper>
        <Explain></Explain>
        <Form>
          <form onSubmit={handleSubmit}>
            <Input placeholder={"storeName"} {...storeName}></Input>
            <Input placeholder={"storeType"} {...storeType}></Input>
            <Input placeholder={"location"} {...location}></Input>
            <Input placeholder={"description"} {...description}></Input>
            <button type="submit">addStore</button>
          </form>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const mapStateToProp = (state, _) => {
  return { state };
};

export default connect(mapStateToProp)(MoreStore);
