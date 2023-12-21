import styled from "styled-components";

export const Input = styled.input`
  padding: 6px 14px;
  width: 300px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border: 2px solid #90f4ff;
    box-shadow: 0 0 8px 2px #90f4ff;
    padding: 12px 24px;
    transition: 0.5s;
  }
`;
