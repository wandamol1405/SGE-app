import styled from "styled-components";

const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: "Libre Franklin", sans-serif;
  margin: 2rem auto 2rem;
  width: 80%;
  gap: 1.5rem;
  border-radius: 15px;
  background-color: #ffcfcf;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.7rem;
    padding: 1rem;
    color: #525b44;
  }

  h2 {
    font-size: 2rem;
    padding: 1rem;
    color: #525b44;
  }

  p {
    font-size: 1.2rem;
    padding: 0.5rem;
    color: #525b44;
  }

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 1rem;
    background-color: #fffdec;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
    font-size: 1rem;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  th {
    background-color: #fffdec;
    padding: 1rem;
    font-size: 1.2rem;
    font-family: "Libre Franklin", sans-serif;
    letter-spacing: 0.05em;
    color: #525b44;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    background-color: #fffdec;
    text-align: center;
    font-family: "Libre Franklin", sans-serif;
    color: #525b44;
  }

  tbody tr:nth-child(even) {
    background-color: #fffdec;
  }
`;

export default CheckContainer;
