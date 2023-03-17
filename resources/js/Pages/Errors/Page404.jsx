import React from 'react'
import { Head } from "@inertiajs/inertia-react";
import { Footer } from "../../Components/Footer/Footer";
import Header from "@/Layouts/HeaderPublica";
import './Page404.css';

const Page404 = (props) => {
  return (

    <>
      <Head title="Welcome" />
      <Header user={props}></Header>

      <div className="container body">
        <div className="row">
          <div className="col-sm">
            <h5 className="seccion__404-titulo">Error 404</h5>
            <h3 className="seccion__404-subtitulo">No hemos podido<br/> encontrar la página <br/> que estás buscando</h3> 
            <p className="seccion__404-mensaje">Gracias por tu paciencia, es posible que el <br/> enlace sea antiguo o haya sido removido.</p>
          </div>
          <div className="col-sm">
            <center>
                <img src="https://www.licitaciones.info/img/error-404.webp" alt="Error 404"/>

            </center>
          </div>
        </div>
      </div>



      <Footer />
    </>

  )
}

export default Page404