import styled from "styled-components";

const NextButton = styled.button`
  background-color: #86a788;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  width: 25vw;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #ffffff;

  &:hover {
    background-color: #525b44;
  }

  @media (min-width: 1080px) {
    width: 12vw;
    font-size: 20px;
    align-self: center;
  }
`;

export default NextButton;
