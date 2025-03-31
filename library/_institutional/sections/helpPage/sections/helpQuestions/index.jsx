import React from "react";
import './styles.scss'

const Index = () =>{
return(
    // Sección de Preguntas Frecuentes 
    <section className="faq-section">
        <h2>Preguntas frecuentes</h2>

        <div className="faq-item-content">
            <div className="faq-item">
                <i className="ph ph-pencil-simple-line iconsTitle"></i>
                <h3>¿Cuáles son los pasos para inscribirme en la universidad?</h3>
                <a href="#">Conoce más<i className="ph ph-arrow-up-right"></i></a>
            </div>

            <div className="faq-item">
                <i className="ph ph-calendar-dots iconsTitle"></i>
                <h3>¿Qué tipos de becas ofrece la Universidad Javeriana?</h3>
                <a href="#">Conoce más<i className="ph ph-arrow-up-right"></i></a>
            </div>

            <div className="faq-item">
                <i className="ph ph-telegram-logo iconsTitle"></i>
                <h3>¿Cuáles son los requisitos para aplicar a un programa de movilidad internacional?</h3>
                <a href="#">Conoce más<i className="ph ph-arrow-up-right"></i></a>
            </div>

            <div className="faq-item">
                <i className="ph ph-currency-circle-dollar iconsTitle"></i>
                <h3>¿Cuáles son las opciones de financiación para pagar la matrícula?</h3>
                <a href="#">Conoce más<i className="ph ph-arrow-up-right"></i></a>
            </div>  
        </div>

    </section>
);
}
export default Index
