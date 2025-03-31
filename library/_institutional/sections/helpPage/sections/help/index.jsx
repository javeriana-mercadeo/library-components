import React from "react"
import './styles.scss'

const Index = () =>{
return(
<section className="help-section">
        <div className="help-header">
            <h2>¿Necesitas ayuda?</h2>
            <a href="/institutional/help/pgInscription">Ver más <i className="ph ph-arrow-right"></i></a>
        </div>

        <div className="help-links">
            <div className="help-item">
                <a href="#">Proceso de Inscripción <i className="ph ph-arrow-up-right"></i></a>
                <p>Todo lo que necesitas saber para inscribirte en la Universidad Javeriana.</p>
            </div>

            <div className="help-item">
                <a href="#">Becas y Financiación <i className="ph ph-arrow-up-right"></i></a>
                <p>Opciones de apoyo económico para facilitar tu ingreso a la universidad.</p>
            </div>

            <div className="help-item">
                <a href="#">Internacionalización y Movilidad <i className="ph ph-arrow-up-right"></i></a>
                <p>Oportunidades de estudios en el extranjero y experiencias internacionales.</p>
            </div>
        </div>
    </section>
);
}
export default Index
