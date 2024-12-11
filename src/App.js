import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nombre, setNombre] = useState("");
  const [director, setDirector] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [anio, setAnio] = useState("");
  const [id, setId] = useState("");

  const [editar, setEditar] = useState(false);

  const [peliculasList, setPeliculas] = useState([]);

  useEffect(() => {
    getPeliculas();
  }, []);

  const add = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/create`, {
      nombre: nombre,
      director: director,
      descripcion: descripcion,
      anio: anio
    }).then(() =>{
      getPeliculas();
      alert("Pelicula registrada");
      limpiarCampos();
    });
  }

  const update = () => {
    Axios.put(`${process.env.REACT_APP_API_URL}/update`, {
      id: id,
      nombre: nombre,
      director: director,
      descripcion: descripcion,
      anio: anio
    }).then(() =>{
      getPeliculas();
      alert("Pelicula actualizada");
      limpiarCampos();
    });
  }

  const deletee = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`).then(() =>{
      getPeliculas();
      alert("Pelicula eliminada");
    });
  }

  const limpiarCampos = () => {
    setNombre("");
    setDirector("");
    setDescripcion("");
    setAnio("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setDirector(val.director);
    setDescripcion(val.descripcion);
    setAnio(val.anio);
    setId(val.id);
  }

  const getPeliculas = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/peliculas`).then((response) =>{
      setPeliculas(response.data);
    });
  }

  return (
    <div className="container">  
      <div className="card text-center">
        <div className="card-header">
          PELÍCULAS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre :</span>
            <input type="text" 
              onChange={(event) => setNombre(event.target.value)}
              className="form-control" value={nombre} placeholder="Ingrese nombre de la película" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Director :</span>
            <input type="text" value={director}
              onChange={(event) => setDirector(event.target.value)}
              className="form-control" placeholder="Ingrese director de la película" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Descrip :</span>
            <input type="text" value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              className="form-control" placeholder="Ingrese descripción de la película" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Año Pu : </span>
            <input type="number" value={anio}
              onChange={(event) => setAnio(event.target.value)}
              className="form-control" placeholder="Ingrese año de estreno de la película" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar ? 
            <div>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button> 
              <button className="btn btn-danger m-2" onClick={limpiarCampos}>Cancelar</button>
            </div>
            : <button className="btn btn-success" onClick={add}>Guardar</button>
          }
        </div>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Director</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Año</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            peliculasList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.director}</td>
                  <td>{val.descripcion}</td>
                  <td>{val.anio}</td>
                  <td>
                    <div>
                      <button type="button" 
                        onClick={() => editarEmpleado(val)}
                        className="btn btn-info m-1">Editar</button>
                      <button type="button" onClick={() => deletee(val.id)}
                        className="btn btn-danger m-1">Eliminar</button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
