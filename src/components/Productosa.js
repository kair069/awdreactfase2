import React, { Component } from 'react';
import axios from 'axios';
import './Productosa.css';

class Productosa extends Component {
  state = {
    productos: [],
    nuevoProducto: {
      nombre: '',
      descripcion: '',
      precio: 0,
      cantidad_stock: 0,
      proveedor: '',
      categoria: '',
    },
  };

  componentDidMount() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    axios
      .get('https://backend2a.azurewebsites.net/productos')
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
    const { nombre, descripcion, precio, cantidad_stock, proveedor, categoria } = this.state.nuevoProducto;

    axios
      .post('https://backend2a.azurewebsites.net/productos', {
        nombre,
        descripcion,
        precio,
        cantidad_stock,
        proveedor,
        categoria,
      })
      .then((response) => {
        console.log(response.data);
        this.obtenerProductos();
        this.setState({
          nuevoProducto: {
            nombre: '',
            descripcion: '',
            precio: 0,
            cantidad_stock: 0,
            proveedor: '',
            categoria: '',
          },
        });
      })
      .catch((error) => {
        console.error('Error al agregar producto:', error);
      });
  };

  render() {
    const { productos, nuevoProducto } = this.state;

    return (








      <div className="productosa-container">
        <h1>Lista de Ventas</h1>
        <form onSubmit={this.handleSubmit} className="product-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={nuevoProducto.descripcion}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={nuevoProducto.precio}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cantidad en Stock:</label>
            <input
              type="number"
              name="cantidad_stock"
              value={nuevoProducto.cantidad_stock}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Proveedor:</label>
            <input
              type="text"
              name="proveedor"
              value={nuevoProducto.proveedor}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Agregar Producto
          </button>
        </form>








        <ul className="product-list">
          {productos.map((producto) => (
            <li key={producto.id} className="product-item">
              <p><strong>Nombre:</strong> {producto.nombre}</p>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Precio:</strong> {producto.precio}</p>
              <p><strong>Cantidad en Stock:</strong> {producto.cantidad_stock}</p>
              <p><strong>Proveedor:</strong> {producto.proveedor}</p>
              <p><strong>Categoría:</strong> {producto.categoria}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Productosa;

