import styled from "styled-components";

const CreateInvoiceContainer = styled.div`
  background-color: #ffcfcf;
  border-radius: 15px;
  align-items: center;
  padding: 4rem;
  width: 60%;
  font-family: "Libre Franklin", sans-serif;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;

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
`;

export default CreateInvoiceContainer;
