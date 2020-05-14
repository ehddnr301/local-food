import React from "react";
import styled from "styled-components";
import axios from "axios";
import useInput from "../Components/useInput";
import Input from "../Components/Input";

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

const MoreStore = ({ history }): JSX.Element => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      storeName.value,
      storeType.value,
      location.value,
      description.value
    );
    try {
      await axios.post("http://localhost:4000/store/list", {
        storeName: storeName.value,
        storeType: storeType.value,
        location: location.value,
        description: description.value,
      });
    } catch (error) {
      console.log(error);
    }
    history.push("/");
  };

  const storeName = useInput("");
  const storeType = useInput("");
  const location = useInput("");
  const description = useInput("");

  return (
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

export default MoreStore;
