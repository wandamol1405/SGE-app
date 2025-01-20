import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #86a788;
  width: 100vw;
  padding: 20px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>
        <strong>Simulador Contable Escolar</strong>
      </p>
      <p>
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
      <p>&copy; 2025 Simulador Escolar. Todos los derechos reservados.</p>
    </FooterContainer>
  );
}

export default Footer;
