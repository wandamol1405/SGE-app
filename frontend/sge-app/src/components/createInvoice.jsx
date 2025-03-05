import styled from "styled-components";

const CreateInvoiceContainer = styled.div`
  display: flex;
  background-color: #ffcfcf;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 70vw;
  font-family: "Libre Franklin", sans-serif;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-direction: column;
  gap: 1rem;

  p {
    color: #525b44;
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }
  h1 {
    color: #525b44;
    font-size: 1.5rem;
    padding: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    align-items: center;
  }
  div {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.3rem;
    color: #525b44;
  }
  @media (min-width: 1080px) {
    width: 55vw;
    font-size: 1.8rem;
  }
`;

export default CreateInvoiceContainer;
