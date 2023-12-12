import React, { useState, useEffect } from 'react';
import './styles/LoadProduct.css';
import { useRef } from 'react';
const LoadProduct = () => {
  const initialState = {
   
    title: '',
    description: '',
    image:"",
    price: 0,
    id: null,
  };

  const [product, setProduct] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    // Cargar productos desde el backend al montar el componente
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3030/products');
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editing ? `http://localhost:3030/products/${product.id}` : 'http://localhost:3030/products';

      const response = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Error al ${editing ? 'actualizar' : 'agregar'} el producto`);
      }

      // Después de la operación CRUD, volver a cargar los productos
      fetchProducts();

      // Limpiar el formulario después de la operación CRUD
      setProduct(initialState);
      setEditing(false);
    } catch (error) {
      console.error(`Error al ${editing ? 'actualizar' : 'agregar'} el producto:`, error.message);
    }
  };

  const handleEdit = (id) => {
    // Encontrar el producto por ID y establecerlo como producto actual para edición
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct);
    setEditing(true);
    setShowMenu(true)
  
    window.scrollTo({ top: 0, behavior: 'smooth' })
  
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Después de la operación CRUD, volver a cargar los productos
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
  };

  return (
    <div>
      <div className="btn-agregar">
       <button onClick={() => setShowMenu(prevState => !prevState)} className="menu-button">
        {showMenu ? 'Cerrar Menu' : 'Agregar producto'}
      </button>
    </div>
    <div className='container-loadProduct'>
      {showMenu && (
          <div>
            <h2>Subir Producto</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="title" value={product.title} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </label>
        <label>
        Imagen:
          <input type="text" name="image" value={product.image} onChange={handleChange} />

        </label>
        <label>
          Precio:
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </label>
        <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      </form>
      </div>
)}
      <table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Url de la imagen</th>
      <th>Imagen</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td><input type="text" value={product.image}/></td>
        <td >
          {/*Tuve que poner tanto el {product.image} en la etiqueta <td> y <img>
           para poder mostrar la imagen y que al enviar el dato al formulario cuando se
           quiere editar no tenga problemas(ya que uno representa un string y el otro una imagen)*/}

          <img src={product.image} alt={product.title} value={product.image}   style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </td>
       
            
        <td>{product.price}</td>
        <td>
          {/* Añadir los botones de "Editar" y "Eliminar" */}
          <button onClick={() => handleEdit(product.id)}>Editar{showMenu
          }</button>
          <button onClick={() => handleDelete(product.id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  </div>)
};

export default LoadProduct