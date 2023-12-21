import styled from "styled-components";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  background-color: #bc03ff;
  padding: ${(props) => (props.isActive ? "14px;" : "7px")};
  transition: 0.5s;

  &:hover {
    border: 2px solid #90f4ff;
    box-shadow: 0 0 8px 2px #90f4ff;
    cursor: pointer;
    background-color: #9d02d5;
  }
`;
