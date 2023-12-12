import './styles/Product.css'
import './ProductList'
import './styles/Media.css'
const Product = ({ product, addCart, removeProductFromCart }) => {
  return (
  //creamos la cart ccon los datos que precisamos
    <div className='divContainer'>
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} />
        <h3>{product.price}</h3>
        <p>{product.description}</p>
          <div>
              <button onClick={() => addCart(product)}>Agregar al carrito</button>
              <button onClick={() => removeProductFromCart(product.id)}>Eliminar del carrito</button>
          </div>
   </div>
  );
};

export default Product;
