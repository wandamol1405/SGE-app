import styled from "styled-components";

const AddButton = styled.button`
  background-color: #fffdec;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 20px;
  width: 20vw;
  cursor: pointer;
  font-family: "Libre Franklin", sans-serif;
  color: #5a6c57;

  &:hover {
    background-color: rgb(184, 216, 132);
  }

  @media (min-width: 1080px) {
    width: 12vw;
    font-size: 20px;
    align-self: center;
  }
`;

export default AddButton;
