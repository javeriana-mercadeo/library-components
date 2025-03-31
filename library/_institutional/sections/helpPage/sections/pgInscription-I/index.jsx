import React from "react";
import './styles.scss'

const Index = () =>{
return(
    // Sección de Proceso de inscripción 
    <section className="inscription-container">

    <div className="item-inscription">  
      <div className="help-header">
        <h3>Proceso de Inscripción</h3>
        <i className="ph ph-arrow-up-right"></i>
      </div>
      <p className="help-description">
        Todo lo que necesitas saber para inscribirte en la Universidad Javeriana.
      </p>
      <ul className="help-questions">
        <li>¿Cuáles son los pasos para inscribirme en la universidad?</li>
        <li>¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?</li>
        <li>¿Dónde puedo consultar las fechas clave del proceso de admisión?</li>
        <li>¿Qué documentos necesito para completar mi inscripción?</li>
        <li>¿Cuándo y cómo recibiré los resultados de admisión?</li>
        <li>¿Cómo subo mis documentos a la plataforma?</li>
        <li>¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?</li>
      </ul>
    </div>

    {/* Sección: Becas y Financiación */}
    <div className="item-inscription">
      <div className="help-header">
        <h3>Becas y Financiación</h3>
        <i className="ph ph-arrow-up-right"></i>
      </div>
      <p className="help-description">
        Opciones de apoyo económico para facilitar tu ingreso a la universidad.
      </p>
      <ul className="help-questions">
        <li>¿Qué tipos de becas ofrece la Universidad Javeriana?</li>
        <li>¿Cómo puedo aplicar a una beca en la Javeriana?</li>
        <li>¿Cuáles son los requisitos para mantener una beca?</li>
        <li>¿Cuáles son las opciones de financiación para pagar la matrícula?</li>
        <li>¿La Javeriana ofrece descuentos en la matrícula?</li>
      </ul>
    </div>

    {/* Sección: Internacionalización y Movilidad */}
    <div className="item-inscription">
      <div className="help-header">
        <h3>Internacionalización y Movilidad</h3>
        <i className="ph ph-arrow-up-right"></i>
      </div>
      <p className="help-description">
        Oportunidades de estudio en el extranjero y experiencias internacionales.
      </p>
      <ul className="help-questions">
        <li>¿Puedo hacer un intercambio académico si soy estudiante nuevo?</li>
        <li>¿Cuáles son los requisitos para aplicar a un programa de movilidad internacional?</li>
        <li>¿Cómo funcionan los convenios de doble titulación?</li>
        <li>¿Qué apoyo brinda la universidad a estudiantes extranjeros?</li>
        <li>¿Existen becas o ayudas económicas para intercambios internacionales?</li>
        <li>¿Cuántas universidades tienen convenio con la Javeriana para intercambios?</li>
      </ul>
    </div>
  </section>
);
}
export default Index
