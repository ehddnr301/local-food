import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const MainInput = styled.input`
  outline: 0;
  border-width: 0 0 2px;
  /* border-color: #2ecc71; */
  border-color: #ccc;
  padding: 10px 20px;
  width: 60%;
  &:focus ~ span {
    width: 60%;
    transition: 0.4s;
  }
`;

const FocusBorder = styled.span`
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 0;
  height: 3px;
  background-color: #2ecc71;
  transition: 0.4s;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  list = null,
}) => (
  <Container>
    <MainInput
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      type={type}
      list={list}
    />
    <FocusBorder />
  </Container>
);

export default Input;
