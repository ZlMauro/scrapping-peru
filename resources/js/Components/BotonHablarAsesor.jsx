import React from 'react'
import "../../css/estilos-boton-hablar-asesor.css";

const BotonHablarAsesor = (props) => {
  return (
        <div className="col-12 text-lefth">
            <a href="/contacto" className={`td-none cta-button bg-${props.color} shadow-button banner-video-paises__button hover:bg-[${props.colorHover}]`}>
    
                <div className="cta-content">
                    <span className="cta-button-text">{props.texto}</span>
                    <div className={`cta-button-icon-content-asesor`}>
                        <span className={`cta-button-icon-content-hidden-text `}>{props.textoHover}</span>
                        <span className="cta-button-icon-content-icon icon-Right"></span>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default BotonHablarAsesor