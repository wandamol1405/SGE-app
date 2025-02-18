import styled from "styled-components";

const BackButton = styled.button`
  background-color: rgb(235, 135, 135);
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 20px;
  width: 20vw;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #fffdec;

  &:hover {
    background-color: rgb(209, 106, 106);
  }

  @media (min-width: 1080px) {
    width: 12vw;
    font-size: 20px;
    align-self: center;
  }
`;

export default BackButton;
