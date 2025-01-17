import styled from "styled-components";

const Title = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  margin: 1rem;
  border-radius: 10px;
  width: 75vw;
  text-align: center;
  font-size: 1.7rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (min-width: 1080px) {
    font-size: 2rem;
  }
`;

export default Title;
