import styled from "styled-components";

const Input = styled.input`
  background-color: #fffdec;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  family-font: "Libre Franklin", sans-serif;
  color: #5a6c57;
  placeholder: #5a6c57;
  placeholder-opacity: 0.5;

  @media (min-width: 1080px) {
    width: 30vw;
    padding: 10px 20px;
    font-size: 20px;
  }
`;

export default Input;
