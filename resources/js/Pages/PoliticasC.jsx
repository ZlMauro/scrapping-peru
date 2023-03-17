import React, { useState, useRef } from "react";
import { Head } from "@inertiajs/inertia-react";
import { FooterLite } from "@/Components/Footer/FooterLite";
import Header from "@/Components/Header/HeaderLite";
import "@fontsource/poppins";
import Nav from "react-bootstrap/Nav";
import "./PoliticasC.css";
import "@fontsource/poppins";

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBScrollspy,
    MDBScrollspyLink,
} from "mdb-react-ui-kit";

export const PoliticasC = (props) => {
    const home = useRef(null);
    const queSonlasCookies = useRef(null);
    const tipoDeCookies = useRef(null);
    const desactivarCookies = useRef(null);
    const cookiesTerceros = useRef(null);
    const advertenciaCookies = useRef(null);
    const leyCookies = useRef(null);
    const containerRef = useRef(null);

    return (
        <>
            <Head title="Politicas de Cookies" />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Roboto&display=swap"
                rel="stylesheet"
            ></link>
            <Header user={props}></Header>

            <MDBContainer className="container">
                <MDBRow>
                    <div className=" container-politicscoo">
                        <div className="termcond">
                            <MDBCol>
                                <div className="termcond-page">
                                    <MDBScrollspy container={containerRef}>
                                        <p className="politicscoo-title-cont">
                                            &nbsp;&nbsp;&nbsp;&nbsp;Contenido
                                        </p>
                                        <MDBScrollspyLink targetRef={home}>
                                            | Inicio
                                        </MDBScrollspyLink>
                                        <hr />
                                        <MDBScrollspyLink
                                            targetRef={queSonlasCookies}
                                        >
                                            ¿Qué son las cookies?
                                        </MDBScrollspyLink>
                                        <hr />
                                        <MDBScrollspyLink
                                            targetRef={tipoDeCookies}
                                        >
                                            ¿Qué tipo de cookies utilizamos?
                                        </MDBScrollspyLink>
                                        <hr />
                                        <MDBScrollspyLink
                                            targetRef={desactivarCookies}
                                        >
                                            ¿Cómo desactivar las cookies?
                                        </MDBScrollspyLink>
                                        <hr />
                                        <MDBScrollspyLink
                                            targetRef={cookiesTerceros}
                                        >
                                            Cookies de terceros
                                        </MDBScrollspyLink>
                                        <hr />
                                        <MDBScrollspyLink
                                            targetRef={advertenciaCookies}
                                        >
                                            Advertencia sobre eliminar cookies
                                        </MDBScrollspyLink>
                                        <hr />
                                        <MDBScrollspyLink
                                            targetRef={leyCookies}
                                        >
                                            ¿Quién debe cumplir la ley de
                                            cookies?
                                        </MDBScrollspyLink>
                                    </MDBScrollspy>
                                </div>
                            </MDBCol>
                        </div>

                        <div
                            className="termcond-info"
                            id="element"
                            ref={containerRef}
                        >
                            <MDBCol>
                                <section ref={home} id="section-1">
                                    <h2 id="home" className="text-center">
                                        <span
                                            className="politicscoo-title"
                                            style={{ color: "#686868b6" }}
                                        >
                                            Política de &nbsp;
                                        </span>
                                        <span
                                            className="politicscoo-title"
                                            style={{ color: "#00a1c9" }}
                                        >
                                            Cookies
                                        </span>
                                    </h2>
                                    <hr className="politicscoo" />
                                    <br />
                                    <p>
                                        En cumplimiento con lo dispuesto en el
                                        artículo 22.2 de la Ley 34/2002, de 11
                                        de julio, de Servicios de la Sociedad de
                                        la Información y de Comercio
                                        Electrónico, Licitaciones.info le
                                        informa, en esta sección, sobre la
                                        política de recogida y tratamiento de
                                        cookies.
                                    </p>
                                    <br />
                                </section>

                                <section ref={queSonlasCookies} id="section-2">
                                    <span
                                        className="politicscoo-subtitles"
                                        id="Son"
                                    >
                                        ¿Qué son las cookies?
                                    </span>
                                    <br />
                                    <br />
                                    <p>
                                        Una cookie es un fichero que se descarga
                                        en su ordenador al acceder a
                                        determinadas páginas web. Las cookies
                                        permiten a una página web, entre otras
                                        cosas, almacenar y recuperar información
                                        sobre los hábitos de navegación de un
                                        usuario o de su equipo y, dependiendo de
                                        la información que contengan y de la
                                        forma en que utilice su equipo, pueden
                                        utilizarse para reconocer al usuario.
                                    </p>
                                    <br />
                                </section>

                                <section ref={tipoDeCookies} id="section-3">
                                    <span
                                        className="politicscoo-subtitles"
                                        id="Desactivar"
                                    >
                                        ¿Qué tipo de cookies utilizamos?
                                    </span>

                                    <br />
                                    <br />
                                    <p>
                                        En Licitaciones.info utilizamos los
                                        siguientes tipos de cookies:
                                    </p>
                                    <br />
                                    <p>
                                        <strong>Cookies de análisis:</strong>{" "}
                                        Son aquéllas que bien tratadas por
                                        nosotros o por terceros, nos permiten
                                        cuantificar el número de usuarios y así
                                        realizar la medición y análisis
                                        estadístico de la utilización que hacen
                                        los usuarios del servicio ofertado. Para
                                        ello se analiza su navegación en nuestra
                                        página web con el fin de mejorar la
                                        oferta de productos o servicios que le
                                        ofrecemos.
                                    </p>
                                    <br />
                                    <p>
                                        <strong>Cookies técnicas:</strong> Son
                                        aquellas que permiten al usuario la
                                        navegación a través del área restringida
                                        y la utilización de sus diferentes
                                        funciones, como, por ejemplo, llevar a
                                        cambio el proceso de compra de un
                                        artículo.
                                    </p>
                                    <br />
                                    <p>
                                        <strong>
                                            Cookies de personalización:
                                        </strong>{" "}
                                        Son aquellas que permiten al usuario
                                        acceder al servicio con algunas
                                        características de carácter general
                                        predefinidas en función de una serie de
                                        criterios en el terminal del usuario
                                        como por ejemplo serian el idioma o el
                                        tipo de navegador a través del cual se
                                        conecta al servicio.
                                    </p>
                                    <br />
                                    <p>
                                        <strong>Cookies publicitarias:</strong>{" "}
                                        Son aquellas que, bien tratadas por esta
                                        web o por terceros, permiten gestionar
                                        de la forma más eficaz posible la oferta
                                        de los espacios publicitarios que hay en
                                        la página web, adecuando el contenido
                                        del anuncio al contenido del servicio
                                        solicitado o al uso que realice de
                                        nuestra página web. Para ello podemos
                                        analizar sus hábitos de navegación en
                                        Internet y podemos mostrarle publicidad
                                        relacionada con su perfil de navegación.
                                    </p>
                                    <br />
                                    <p>
                                        <strong>
                                            Cookies de publicidad
                                            comportamental:
                                        </strong>{" "}
                                        Son aquellas que permiten la gestión, de
                                        la forma más eficaz posible, de los
                                        espacios publicitarios que, en su caso,
                                        el editor haya incluido en una página
                                        web, aplicación o plataforma desde la
                                        que presta el servicio solicitado. Este
                                        tipo de cookies almacenan información
                                        del comportamiento de los visitantes
                                        obtenida a través de la observación
                                        continuada de sus hábitos de navegación,
                                        lo que permite desarrollar un perfil
                                        específico para mostrar avisos
                                        publicitarios en función del mismo.
                                    </p>
                                </section>
                                <br />
                                <section ref={desactivarCookies} id="section-4">
                                    <span
                                        className="politicscoo-subtitles"
                                        id="Terceros"
                                    >
                                        ¿Cómo desactivar las cookies?
                                    </span>
                                    <br />
                                    <br />
                                    <p>
                                        Puede usted permitir, bloquear o
                                        eliminar las cookies instaladas en su
                                        equipo mediante la configuración de las
                                        opciones del navegador instalado en su
                                        ordenador. En la mayoría de los
                                        navegadores web se ofrece la posibilidad
                                        de permitir, bloquear o eliminar las
                                        cookies instaladas en su equipo. A
                                        continuación, puede acceder a la
                                        configuración de los navegadores webs
                                        más frecuentes para aceptar, instalar o
                                        desactivar las cookies:
                                    </p>
                                    <br />
                                    <Nav.Link
                                        className="politicscoo-link"
                                        target="_blank"
                                        href="https://support.google.com/accounts/search?q=cookies"
                                    >
                                        Configurar cookies en Google Chrome{" "}
                                    </Nav.Link>
                                    <br />
                                    <Nav.Link
                                        className="politicscoo-link"
                                        target="_blank"
                                        href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                                    >
                                        Configurar cookies en Microsoft Internet
                                        Explorer{" "}
                                    </Nav.Link>
                                    <br />
                                    <Nav.Link
                                        className="politicscoo-link"
                                        target="_blank"
                                        href="https://support.mozilla.org/es/kb/Borrar%20cookies#search"
                                    >
                                        Configurar cookies en Mozilla Firefox{" "}
                                    </Nav.Link>
                                    <br />
                                    <Nav.Link
                                        className="politicscoo-link"
                                        target="_blank"
                                        href="https://support.apple.com/es-co/guide/safari/sfri11471/mac"
                                    >
                                        Configurar cookies en Safari (Apple){" "}
                                    </Nav.Link>
                                    <br />
                                    <br />
                                </section>
                                <br />
                                <section ref={cookiesTerceros} id="section-5">
                                    <span
                                        className="politicscoo-subtitles"
                                        id="Advertencia"
                                    >
                                        Cookies de terceros
                                    </span>
                                    <br />
                                    <br />
                                    <p>
                                        Utilizamos servicios de terceros para
                                        recopilar información con fines
                                        estadísticos y de uso de la web. Se usan
                                        cookies de DoubleClick para mejorar la
                                        publicidad que se incluye en el sitio
                                        web. Son utilizadas para orientar la
                                        publicidad según el contenido que es
                                        relevante para un usuario, mejorando así
                                        la calidad de experiencia en el uso del
                                        mismo.
                                    </p>
                                    <br />
                                    <p>
                                        En concreto, usamos los servicios de
                                        Google Adsense y de Google Analytics
                                        para nuestras estadísticas y publicidad.
                                        Algunas cookies son esenciales para el
                                        funcionamiento del sitio, por ejemplo el
                                        buscador incorporado.
                                    </p>
                                    <br />
                                    <p>
                                        Nuestro sitio incluye otras
                                        funcionalidades proporcionadas por
                                        terceros. Usted puede fácilmente
                                        compartir el contenido en redes sociales
                                        como Facebook, Twitter o Google +, con
                                        los botones que hemos incluido a tal
                                        efecto.
                                    </p>
                                </section>
                                <section
                                    ref={advertenciaCookies}
                                    id="section-6"
                                >
                                    <span
                                        className="politicscoo-subtitles"
                                        id="Quienes"
                                    >
                                        Advertencia sobre eliminar cookies
                                    </span>
                                    <br />
                                    <br />
                                    <p>
                                        Usted puede eliminar y bloquear todas
                                        las cookies de este sitio, pero parte
                                        del sitio no funcionará o la calidad de
                                        la página web puede verse afectada.
                                    </p>
                                    <br />
                                    <p>
                                        Si tiene cualquier duda acerca de
                                        nuestra política de cookies, puede
                                        contactarnos a través de nuestros
                                        canales de Contacto.
                                    </p>
                                </section>

                                <section ref={leyCookies} id="section-7">
                                    <span className="termcond-subtitles">
                                        ¿Quién debe cumplir la ley de cookies?
                                    </span>
                                    <br />
                                    <br />
                                    <p>
                                        Tanto las empresas como los
                                        profesionales que tengan una página web
                                        o un blog en España, así como cualquiera
                                        que ofrezca servicios de la información,
                                        deben cumplir con lo establecido en la
                                        Ley de cookies.
                                    </p>
                                    <br />
                                    <p>
                                        Si quieres ampliar la información acerca
                                        del uso de las cookies te recomiendo la
                                        lectura de la guía sobre el uso de las
                                        cookies realizada por la Agencia
                                        Española de Protección de Datos (AGPD).
                                    </p>
                                </section>
                            </MDBCol>
                        </div>
                    </div>
                </MDBRow>
            </MDBContainer>

            <FooterLite />
        </>
    );
};

export default PoliticasC;
