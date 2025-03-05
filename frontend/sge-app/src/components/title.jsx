import styled from "styled-components";

const Title = styled.div`
  padding: 1.5rem;
  background-color: rgb(236, 151, 151);
  margin: 1rem;
  border-radius: 10px;
  width: 90%;
  text-align: center;
  justify-content: center;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  color: black;
  gap: 1.5rem;
  @media (min-width: 1080px) {
    width: 70%;
  }
`;

export default Title;
