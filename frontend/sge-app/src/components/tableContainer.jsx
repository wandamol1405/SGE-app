import styled from "styled-components";

const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 800px;
  margin: 1rem 0;
  font-size: 1rem;
  border-radius: 10px;
  overflow: hidden;

  th,
  td {
    border: 1px solid #d4d4d4;
    padding: 0.5rem;
    background-color: #fffdec;
    text-align: center;
    font-family: "Libre Franklin", sans-serif;
    color: #5a6c57;

    /* PERMITE QUE EL TEXTO SE QUEBREE EN MÚLTIPLES LÍNEAS */
    word-wrap: break-word;
    white-space: normal;
  }

  /* ESTILOS RESPONSIVOS */
  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.9rem; /* Reduce el tamaño del texto */
    }
  }
`;

export default TableContainer;
