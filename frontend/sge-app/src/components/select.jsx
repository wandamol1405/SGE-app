import styled from "styled-components";

const Select = styled.select`
  background-color: #fffdec;
  color: #5a6c57;
  border: none;
  width: 55vw;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  text-align: center;

  &::option {
    color: #5a6c57;
    opacity: 0.6;
    text-align: center;
  }

  @media (min-width: 1080px) {
    width: 27vw;
    padding: 10px 20px;
    font-size: 20px;

    &::option {
      color: #5a6c57;
      opacity: 0.6;
      width: 32vw;
      text-align: center;
    }
  }
`;

export default Select;
