import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  background-color: #86a788;
  color: white;
  padding: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  return (
    <Nav>
      <StyledLink to="/">Sistema de Gestión de Empresas</StyledLink>
    </Nav>
  );
}

export default Navbar;
