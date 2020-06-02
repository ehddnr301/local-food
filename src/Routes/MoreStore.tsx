import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import useInput from "../Components/useInput";
import Input from "../Components/Input";
import { useHistory, Redirect } from "react-router-dom";
import backgroundMore from "../Images/backgroundMore.jpg";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${backgroundMore});
`;

const FormWrapper = styled.div`
  width: 60%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
`;

const Explain = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid white;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 60%;
  padding: 2% 5% 1%;
  border: 0;
  border-radius: 10px;
  outline: none;
  color: white;
  background-color: #2ecc71;
  font-family: "Jua", sans-serif;
  font-size: 20px;
`;

const MoreStore = (): JSX.Element => {
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    makeStore();
  };
  const makeStore = async () => {
    const userId = localStorage.getItem("user");
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
  const [type, setType] = useState("");
  const location = useInput("");
  const description = useInput("");

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    console.log(value);
    if (value !== "pub" && value !== "restaurant" && value !== "cafe") {
      setType("");
    } else {
      setType(value);
    }
  };

  return isSuccess ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <FormWrapper>
        <Explain></Explain>
        <Form>
          <form onSubmit={handleSubmit}>
            <Input placeholder={"가게이름"} {...storeName}></Input>
            <Input
              placeholder={"가게종류를 선택해주세요"}
              onChange={onChange}
              value={type}
              required
              list="type"
            ></Input>
            <datalist id="type">
              <option value="pub">주점</option>
              <option value="restaurant">음식점</option>
              <option value="cafe">카페</option>
            </datalist>
            <Input placeholder={"주소"} {...location}></Input>
            <Input
              placeholder={"간단한 설명 부탁드려요🙏"}
              {...description}
            ></Input>
            <Button type="submit">추가하기</Button>
          </form>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default MoreStore;
