import styled from "styled-components";
import { Input } from "../Input/styles";

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  background-color: #6c567b;
  transition: 0.5s;
  padding: 6px 12px;
  &:hover {
    border: 2px solid #90f4ff;
    box-shadow: 0 0 8px 2px #90f4ff;
    cursor: pointer;
    background-color: #9d02d5;
  }
  ${Input}:focus + & {
    padding: 12px 24px;
    transition: 0.5s;
  }
`;
