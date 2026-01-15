import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import CreateDocsContainer from "../components/createDocs";

function SelectDocs() {
  return (
    <CreateDocsContainer>
    <h1>Términos y Condiciones de Uso</h1>
    <p>Bienvenido al <strong>Simulador Contable Educativo</strong>. Al acceder y utilizar esta plataforma, el usuario (alumno o docente) acepta cumplir con los siguientes términos:</p>

    <div class="highlight">
        AVISO IMPORTANTE: Esta es una herramienta de uso exclusivamente DIDÁCTICO. Los documentos generados NO TIENEN VALIDEZ LEGAL ni fiscal ante ningún organismo gubernamental.
    </div>

    <h2>1. Naturaleza de la Plataforma</h2>
    <p>El Simulador es una herramienta pedagógica diseñada para la práctica de procesos contables, emisión de documentos comerciales y gestión empresarial ficticia. No constituye un software de facturación real ni un sistema de gestión contable oficial.</p>

    <h2>2. Creación de Empresas y Usuarios</h2>
    <ul>
        <li>Cada cuenta de "Empresa" creada por los alumnos debe utilizar nombres que no infrinjan derechos de autor ni resulten ofensivos.</li>
        <li>El usuario es responsable de la veracidad de los datos cargados para el correcto desarrollo del ejercicio académico.</li>
        <li>Se prohíbe el uso de la plataforma para fines ajenos a los objetivos del curso dictado.</li>
    </ul>

    <h2>3. Documentos Comerciales Emitidos</h2>
    <p>Respecto a las facturas, remitos, recibos y demás documentos generados por el sistema:</p>
    <ul>
        <li><strong>Invalidez Fiscal:</strong> Ningún documento tiene valor legal. Queda expresamente prohibido intentar presentar estos comprobantes ante autoridades tributarias o terceros como documentos reales.</li>
        <li><strong>Responsabilidad del Contenido:</strong> El usuario es el único responsable del contenido insertado en los campos de texto de dichos documentos.</li>
    </ul>

    <h2>4. Propiedad Intelectual</h2>
    <p>El código fuente, la lógica de cálculo, el diseño gráfico y la estructura de la base de datos son propiedad de Maria Wanda Molina. Su reproducción total o parcial fuera del entorno educativo permitido está prohibida.</p>

    <h2>5. Limitación de Responsabilidad</h2>
    <p>El desarrollador no se hace responsable por:</p>
    <ul>
        <li>Cálculos erróneos derivados de una mala configuración del usuario.</li>
        <li>Pérdida de datos por fallos en el servidor o manipulación indebida.</li>
        <li>El uso del simulador como herramienta de asesoría financiera o contable real.</li>
    </ul>

    <h2>6. Privacidad y Datos</h2>
    <p>Los datos ingresados en la simulación (nombres ficticios, montos, transacciones) se utilizan exclusivamente para fines de evaluación docente. No serán compartidos con terceros ni utilizados con fines comerciales.</p>

    <h2>7. Modificaciones</h2>
    <p>Nos reservamos el derecho de modificar estos términos para adaptarlos a nuevas funciones pedagógicas o normativas educativas sin previo aviso.</p>

    <div class="footer">
        <p>Última actualización: 14 de enero de 2026</p>
        <p><em>Al continuar utilizando este simulador, confirmas que has leído y aceptado estas condiciones.</em></p>
    </div>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CreateDocsContainer>
  );
}

export default SelectDocs;
