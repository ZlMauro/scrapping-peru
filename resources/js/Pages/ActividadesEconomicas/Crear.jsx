import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "./Crear.css";

/*Toast*/
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "../../../css/estilos-toast.css";
import "../../../css/font-unicolor.css";
/*Toast*/

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

/*Form */
import Form from "react-bootstrap/Form";
import { useForm, Head } from "@inertiajs/inertia-react";
/*Form */

const Crear = ({ auth, actividades_economicas, solo_sectores }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { data, setData, post, processing, reset, errors } = useForm({
        id: "",
        nombre: "",
        sector: "",
        segmento: "",
        tipo_categoria: 1,
    });
    const [fakeSectores, setFakeSectores] = useState(actividades_economicas);
    const [sectores, setSectores] = useState(solo_sectores);
    const [segmentos, setSegmentos] = useState([]);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const sector = document.querySelectorAll(".sector")[0].value;
        const segmento = document.querySelectorAll(".segmento")[0].value;

        /*  select.sector.form-select */
        const form = event.currentTarget;
        setValidated(true);

        if (
            segmento == "Selecciona un Segmento" ||
            sector == "Selecciona un Sector"
        ) {
            event.preventDefault();
            event.stopPropagation();
            document
                .querySelectorAll("select.segmento.form-select")[0]
                .classList.add("failed");
            document
                .querySelectorAll("select.sector.form-select")[0]
                .classList.add("failed");
            return;
        }

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            post(route("actividades-economicas.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            var responses = Object.values(errors);
            var message = "";
            {
                responses.map((response) => (message += response));
            }
            setToastMessage(message);
            setShowToast(true);
        }
    }, [errors]);

    const getSegmentos = (e) => {
        document
            .querySelectorAll("select.segmento.form-select")[0]
            .classList.remove("failed");
        document
            .querySelectorAll("select.sector.form-select")[0]
            .classList.remove("failed");
        setData("sector", e.target.value);
        var parent = e.target.value;
        const input_filter = parent;
        const pattern = new RegExp(input_filter, "i");
        const FilteredActividadesEcomomicas = fakeSectores.filter(function (
            el
        ) {
            if (pattern.test(el.id_padre_sub_categoria)) {
                return el;
            }
        });
        setSegmentos(FilteredActividadesEcomomicas);
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Actividades económicas" />
            <ToastContainer position="bottom-start">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={300000}
                    autohide
                >
                    <div className="notification-toast error">
                        <span className="toast-icon toast-danger">
                            <span className="icon-error"></span>
                        </span>
                        <p className="title">{toastMessage}</p>
                        <button
                            type="button"
                            className="icon-close m-auto"
                            onClick={() => setShowToast(false)}
                        />
                    </div>
                </Toast>
            </ToastContainer>
            <div className="contenedor-planes">
                <div className="bg-white overflow-auto w-full text-center margen-superior">
                    <h2 className="name_section_app">
                        Crear Actividad económica
                    </h2>
                    <div className="container mt-4">
                        <Form
                            id="form"
                            name="form"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="row">
                                <div className="col-12 col-sm-4">
                                    <Form.Label
                                        htmlFor=""
                                        for="validationInput"
                                        className="bloque__registro-form-title-label"
                                    >
                                        Seleccione el sector
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <Form.Select
                                        name="sector"
                                        className="sector"
                                        id=""
                                        onChange={getSegmentos}
                                    >
                                        <option>Selecciona un Sector</option>
                                        {sectores.map((sector) => (
                                            <option value={sector.id}>
                                                {sector.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className="row mt-3">
                                <div className="col-12 col-sm-4">
                                    <Form.Label
                                        htmlFor=""
                                        for="validationInput"
                                        className="bloque__registro-form-title-label"
                                    >
                                        Seleccione el segmento
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <Form.Select
                                        name="segmento"
                                        className="segmento"
                                        id=""
                                        onChange={(e) =>
                                            setData("segmento", e.target.value)
                                        }
                                    >
                                        <option>Selecciona un Segmento</option>
                                        {segmentos.map((segmento) => (
                                            <option value={segmento.id}>
                                                {segmento.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className="row mt-3">
                                <div className="col-12 col-sm-4">
                                    <Form.Label
                                        htmlFor=""
                                        for="validationInput"
                                        className="bloque__registro-form-title-label"
                                    >
                                        Nombre Actividad económica
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre Actividad económica"
                                        value={data.nombre}
                                        onChange={(e) =>
                                            setData("nombre", e.target.value)
                                        }
                                        className="actividad-economica"
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row mt-3">
                                <div className="col-12 col-sm-4">
                                    <Form.Label
                                        htmlFor=""
                                        for="validationInput"
                                        className="bloque__registro-form-title-label"
                                    >
                                        Código de verificación
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <Form.Control
                                        type="number"
                                        placeholder="Código de verificación"
                                        value={data.id}
                                        onChange={(e) =>
                                            setData("id", e.target.value)
                                        }
                                        className="actividad-economica"
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mt-4">
                                <button
                                    type="submit"
                                    className={`btn btnRadius btn-new-blue mr-2`}
                                >
                                    Crear
                                </button>
                                <a
                                    href={route("actividades-economicas.index")}
                                    className="btn btnRadius btn-new-red ml-2"
                                >
                                    Cancelar
                                </a>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Crear;
