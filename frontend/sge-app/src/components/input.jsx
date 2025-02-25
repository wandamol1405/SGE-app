import styled from "styled-components";

const Input = styled.input`
  background-color: #fffdec;
  color: #5a6c57;
  border: none;
  width: 40vw;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  text-align: center; /* Centrar el texto del input */

  &::placeholder {
    color: #5a6c57;
    opacity: 0.6;
    text-align: center;
  }

  @media (min-width: 1080px) {
    width: 30vw;
    padding: 10px 20px;
    font-size: 20px;
  }
`;

export default Input;
