import React from "react";
import Product from "./Product";
import './styles/ProductList.css'
import './styles/Media.css'
import { useState, useEffect } from "react";
const ProductList=({products, addCart, removeProductFromCart})=>{
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
    // Filtrar productos basándose en la cadena de búsqueda
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);
return(
    
  <> 




<div className="search-container">
      {/* Agregar el componente de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Mostrar productos filtrados solo si hay una cadena de búsqueda */}
      {searchTerm && (
        <div>
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              addCart={addCart}
              removeProductFromCart={removeProductFromCart}
            />
          ))}
        </div>
      )}
    </div>

    <div className='productlist-container'>
      <div className="tituloContainer"> 
        <h2>Lista de productos</h2>
      </div>
 
      <section>
        {/* Mostrar todos los productos si no hay cadena de búsqueda */}
        {!searchTerm && products.map((prod) => (
          <Product
            key={prod.id}
            product={prod}
            addCart={addCart}
            removeProductFromCart={removeProductFromCart}
          />
        ))}
      </section>
    </div>


</>)}  
export default ProductList;
