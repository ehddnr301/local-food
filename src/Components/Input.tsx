import React from "react";
import styled from "styled-components";

const Container = styled.input``;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  list = null,
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    list={list}
  />
);

export default Input;
