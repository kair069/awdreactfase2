import React, { Component } from 'react';
import axios from 'axios';



class Productos extends Component {
  state = {
    productos: [],    
    nuevoProducto: {
      nombre: '',
      descripcion: '',
      precio: 0,
    },
    productoAEditar: null,
  };

  componentDidMount() {
    this.obtenerProductos();
  }


  obtenerProductos() {
    axios.get('https://reactbackenda.azurewebsites.net/productos')
      .then((response) => {
        this.setState({ productos: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      nuevoProducto: {
        ...this.state.nuevoProducto,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { nombre, descripcion, precio } = this.state.nuevoProducto;

    axios.post('https://reactbackenda.azurewebsites.net/productos', {
      nombre,
      descripcion,
      precio,
    })
    .then((response) => {
      console.log(response.data);
      this.obtenerProductos();
      this.setState({
        nuevoProducto: {
          nombre: '',
          descripcion: '',
          precio: 0,
        },
      });
    })
    .catch((error) => {
      console.error('Error al agregar producto:', error);
    });
  };

  handleProductoAEditarChange = (field, value) => {
    if (this.state.productoAEditar) {
      this.setState((prevState) => ({
        productoAEditar: {
          ...prevState.productoAEditar,
          [field]: value,
        },
      }));
    }
  };

  actualizarProducto = () => {
    const { id, nombre, descripcion, precio } = this.state.productoAEditar;

    axios.put(`https://reactbackenda.azurewebsites.net/productos/${id}`, {
      nombre,
      descripcion,
      precio,
    })
    .then((response) => {
      console.log(response.data);
      this.obtenerProductos();
      this.setState({ productoAEditar: null });
    })
    .catch((error) => {
      console.error('Error al actualizar producto:', error);
    });
  };

  activarEdicion = (producto) => {
    this.setState({ productoAEditar: { ...producto } });
  };

  cancelarEdicion = () => {
    this.setState({ productoAEditar: null });
  };

  eliminarProducto = (id) => {
    axios.delete(`https://reactbackenda.azurewebsites.net/productos/${id}`)
      .then((response) => {
        console.log(response.data);
        this.obtenerProductos();
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
      });
  };



  render() {
    const { productos, nuevoProducto, productoAEditar } = this.state;

    return (
      <div className="container">
        <h1 className="mt-4">Lista de Productos</h1>


        <form onSubmit={this.handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={nuevoProducto.nombre}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  value={nuevoProducto.descripcion}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  className="form-control"
                  value={nuevoProducto.precio}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary btn-block btn-lg mt-2">Agregar Producto</button>
            </div>
          </div>
        </form>

        <div className="row mb-4">
          <div className="col-md-4">
            <button className="btn btn-primary btn-lg" onClick={this.realizarPrediccion}>
              Realizar Predicción de Precio
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success btn-lg" >
              Exportar a CSV
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success btn-lg" >
              Exportar a Excel
            </button>
          </div>
        </div>

        <ul className="list-group">
          {productos.map((producto) => (
            <li className="list-group-item" key={producto.id}>
              <div className="row">
                <div className="col-md-4">
                  <strong>Nombre:</strong>
                  {productoAEditar && productoAEditar.id === producto.id ? (
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={productoAEditar.nombre}
                      onChange={(e) => this.handleProductoAEditarChange('nombre', e.target.value)}
                    />
                  ) : (
                    producto.nombre
                  )}
                </div>
                <div className="col-md-4">
                  <strong>Descripción:</strong>
                  {productoAEditar && productoAEditar.id === producto.id ? (
                    <input
                      type="text"
                      name="descripcion"
                      className="form-control"
                      value={productoAEditar.descripcion}
                      onChange={(e) => this.handleProductoAEditarChange('descripcion', e.target.value)}
                    />
                  ) : (
                    producto.descripcion
                  )}
                </div>
                <div className="col-md-2">
                  <strong>Precio:</strong>
                  {productoAEditar && productoAEditar.id === producto.id ? (
                    <input
                      type="number"
                      name="precio"
                      className="form-control"
                      value={productoAEditar.precio}
                      onChange={(e) => this.handleProductoAEditarChange('precio', e.target.value)}
                    />
                  ) : (
                    producto.precio
                  )}
                </div>
                <div className="col-md-2">
                  {productoAEditar && productoAEditar.id === producto.id ? (
                    <div>
                      <button className="btn btn-warning btn-lg" onClick={this.actualizarProducto}>
                        Guardar
                      </button>
                      <button className="btn btn-warning btn-lg ml-2" onClick={this.cancelarEdicion}>
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="btn btn-warning btn-lg" onClick={() => this.activarEdicion(producto)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-lg ml-2" onClick={() => this.eliminarProducto(producto.id)}>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Productos;








