import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #86a788;
  width: 100vw; /* Asegura que ocupe todo el ancho de la ventana */
  min-height: 30vh;
  padding: 20px;
  text-align: center;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: 25vh;
    font-size: 1rem;
    padding: 30px 15px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <p>
        <strong>Simulador Contable Escolar</strong>
      </p>
      <p>
        {" "}
        <br />
        Un proyecto para aprender economía y contabilidad mediante simulación
        empresarial.
      </p>
      <nav>
        <a href="/terminos">Términos y Condiciones</a> |
        <a href="/privacidad">Política de Privacidad</a> |
        <a href="/contacto">Contáctanos</a>
      </nav>
      <p>
        Desarrollado para estudiantes de Economía de la Escuela IPEM N° 135.
      </p>
      <p>
        <strong>Desarrollado por: </strong>
        <a href="https://www.linkedin.com/in/wandamolina1405">Wanda Molina</a>
      </p>
      <p>
        <br />
        &copy; 2025 Simulador Escolar. Todos los derechos reservados.
      </p>
    </FooterContainer>
  );
}

export default Footer;
