/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useState, useEffect } from 'react';

import LogPage from '../home/logPage'
const ListCliente = () => {
    //urtl ruta del backend
    const url = 'https://mitienda-backend-gz25.onrender.com/';
    // Arroy para almacenar la informacion de los resgistros en una tabla
    const [clientes, setClientes] = useState([]);

    //funcion para listar los datos del cliente
    const listarCliente = async () => {
        await axios.get(url + 'cliente')
            .then(res => setClientes(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        listarCliente()
    }, [])

    /** 
     * funcion para guardar datos
     */
    const [_id, setId] = useState('')
    const [identificacion, setIdenticacion] = useState('')
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [celular, setCelular] = useState('')
    const [genero, setGenero] = useState('')
    const [fechadenacimiento, setFechadenacimiento] = useState('')

    const guardar = (event) => {
        event.preventDefault()
        if (_id.length == 0) {
            axios.post(url + "cliente", {
                identificacion, nombre, correo, celular, genero, fechadenacimiento
            })
                .then(res => limpiar())
                .catch(err => console.log(err))
        }
        else {
            axios.put(url + "cliente", {
                _id, identificacion, nombre, correo, celular, genero, fechadenacimiento
            })
                .then(res => limpiar())
                .catch(err => console.log(err))
        }
    }
    /**
     * limpiar
     */
    const limpiar = () => {
        setIdenticacion('')
        setNombre('')
        setCorreo('')
        setCelular('')
        setGenero('')
        setFechadenacimiento('')
        const btnClose = document.getElementById('btnClose')
        btnClose.click()
        listarCliente()
    }

    /**
     * metodo para eliminar (borrar) los registros
     */
    const eliminar = async (id) => {
        await axios.delete(url + "cliente/" + id)
            .then(res => listarCliente())
            .catch(err => console.log(err))
    }

    /** 
     * editar
     */
    const editar = (data) => {
        setId(data._id);
        setIdenticacion(data.identificacion);
        setNombre(data.nombre);
        setCorreo(data.correo);
        setCelular(data.celular);
        setGenero(data.genero);
        setFechadenacimiento(data.fechadenacimiento.substring(0, 10));

        const btnNuevo = document.getElementById('btnNuevo')
        btnNuevo.click();
    }

    /**
     * buscar
     */
    const buscar = async (nom) => {
        if (nom.length == 0) {
            listarCliente()
        }
        else {
            await axios.get(url + 'cliente/nom/' + nom)
                .then(res => setClientes(res.data))
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <LogPage />
            <div class="card m-2">
                <div class="card-header text-bg-info">

                    Gestión de clientes
                </div>

                <div class="card-body">
                    <div className='row'>
                        <div className='col-5'>
                            <input type="search" onKeyUp={(e) => buscar(e.target.value)} className="form-control" placeholder='Digite un nombre' />

                        </div>
                        <div className='col-1'>
                            <button type="button" class="btn btn-outline-primary" title='Buscar'>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button></div>
                        <div className='col-6 text-end'>
                            <button type="button" id='btnNuevo' class="btn btn-outline-primary" title='Nuevo' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fa-solid fa-address-book"></i>
                            </button></div>
                    </div>
                    <hr />

                    <table class="table table-hover table-bordered">
                        <thead className="table-info">
                            <tr>

                                <th scope="col">Item</th>
                                <th scope="col">Identificación</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Opciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <th scope='row'>1</th>
                                        <td>{cliente.identificacion}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.correo}</td>
                                        <td>{cliente.celular}</td>
                                        <td className='text-center'>
                                            <button type="button" onClick={() => { editar(cliente) }} className="btn btn-outline-warning " title='Editar'>
                                                <i className="fa-solid fa-pencil"></i> editar {/*// icono de lapiz*/}
                                            </button>

                                            <button type="button" onClick={() => { eliminar(cliente._id) }} className="btn btn-outline-danger" title='Eliminar'>
                                                <i className="fa-solid fa-trash-can"></i> borrar {/*// icono de basura*/}
                                            </button>
                                        </td>
                                    </tr>
                                )
                                )}


                        </tbody>
                    </table>
                </div>
            </div>

            { /*ventana modal para guardar*/}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Nuevo cliente</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={guardar}>
                                <div className='row'>

                                    <div class="col mb-1">
                                        <label for="recipient-name" class="col-form-label">Identificacion:</label>
                                        <input type="number" value={identificacion} onChange={(e) => setIdenticacion(e.target.value)} class="form-control" required />
                                    </div>

                                    <div class="col mb-1">
                                        <label for="recipient-name" class="col-form-label">Nombre:</label>
                                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} class="form-control" required />
                                    </div>

                                </div>

                                <div class="mb-1">
                                    <label for="recipient-name" class="col-form-label">Correo:</label>
                                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} class="form-control" required />
                                </div>

                                <div class="mb-1">
                                    <label for="recipient-name" class="col-form-label">Celular:</label>
                                    <input type="number" value={celular} onChange={(e) => setCelular(e.target.value)} class="form-control" required />
                                </div>

                                <div class="mb-1">
                                    <label for="recipient-name" class="col-form-label">Fecha de nacimiento:</label>
                                    <input type="date" value={fechadenacimiento} onChange={(e) => setFechadenacimiento(e.target.value)} class="form-control" required />
                                </div>

                                <div class="mb-1">
                                    <label for="recipient-name" class="col-form-label">Genero:</label>
                                    <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} class="form-control" required />
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='btnClose'>Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListCliente 