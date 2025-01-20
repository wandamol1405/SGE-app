import styled from "styled-components";

const LogButton = styled.button`
  background-color: #ffcfcf;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 20px;
  width: 20vw;
  align-self: center;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #525b44;

  @media (min-width: 1080px) {
    width: 8vw;
    font-size: 20px;
    align-self: center;
  }

  &:hover {
    background-color: #ffb3b3;
  }
`;

export default LogButton;
