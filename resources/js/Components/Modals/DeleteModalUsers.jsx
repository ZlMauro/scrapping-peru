import React from 'react'
import "./Modal.css";
import { Link } from "@inertiajs/inertia-react";

//const DeleteModal = ({ props.usuario }) => {
const DeleteModal = props => {
    const { handleSearch } = props

    const deleteActividadEconomica = () => {
        fetch('/usuarios/' + props.usuario.uuid + '/delete')
            .then((response) => response.json())
            .then((data) => {
                if (data == "Success") {
                    console.log("Sucess")
                    handleSearch();
                    location.reload();
                } else {
                    console.log("Error")
                }
            })


    }
    return (
        <div className="modal fade show" id={"deleteModal" + props.usuario.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" id="modal-header-delete-user">
                        <h5 className="modal-title" id="exampleModalLabel">Eliminar Usuario</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={handleSearch}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <h6 className='color-negro'>¿Quieres eliminar el usuario {props.usuario.nombre_completo} ?</h6>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={deleteActividadEconomica}
                            className="btn btn-danger">
                            Eliminar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleSearch}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal