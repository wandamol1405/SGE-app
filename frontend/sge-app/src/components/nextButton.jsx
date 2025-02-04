import styled from "styled-components";

const NextButton = styled.button`
  background-color: #86a788;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 20px;
  width: 20vw;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #ffffff;

  &:hover {
    background-color: #525b44;
  }

  @media (min-width: 1080px) {
    width: 8vw;
    font-size: 20px;
    align-self: center;
  }
`;

export default NextButton;
