import styled from "styled-components";

const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  font-size: 1rem;
  border-radius: 10px;
  overflow: hidden;

  th {
    background-color: #fffdec;
    color: #ffffff;
    padding: 1rem;
    font-size: 1.5rem;
    font-family: "Libre Franklin", sans-serif;
    letter-spacing: 0.05em;
  }

  th,
  td {
    border: 1px solid #d4d4d4;
    padding: 0.5rem;
    background-color: #fffdec;
    text-align: center;
    font-family: "Libre Franklin", sans-serif;
    color: #5a6c57;
  }

  tr:nth-child(even) {
    background-color: #f7f9f7; /* Un tono suave y limpio */
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }

  tr:hover {
    background-color: #e8f5e9; /* Un color destacado pero suave */
    transition: background-color 0.3s ease;
  }

  td {
    vertical-align: middle; /* Asegura una alineación uniforme */
  }

  input {
    width: calc(100% - 1rem);
    padding: 1rem;
    border: none;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    font-family: "Libre Franklin", sans-serif;
    font-size: 1.1rem;
    color: #5a6c57;
    opacity: 0.8;
    background-color: #fffdec;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input:focus {
    border-color: #3a4731;
    box-shadow: 0 0 5px rgba(58, 71, 49, 0.5);
    outline: none;
  }

  caption {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333333;
    font-family: "Libre Franklin", sans-serif;
    text-align: left;
  }
`;

export default TableContainer;
