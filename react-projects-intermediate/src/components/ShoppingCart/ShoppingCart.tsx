import { useContext, useEffect, useState } from "react";
import type { Product } from "./useServices";
import useServices from "./useServices";
import { NavLink } from "react-router-dom";
import { cartContext } from "./cartReducer";

const ShoppingCart = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState<Product[]>([]);

  const {dispatch} = useContext(cartContext);


  useEffect (() => {
    useServices.getProducts().then(res => {setProducts(res.data); setVisible(res.data)}).catch(err => console.log(err.message));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative bg-green-300 flex flex-col items-center justify-evenly py-10 gap-10">
        <NavLink to={'/cart'} className="absolute top-5 right-5 text-6xl">🛒</NavLink>
        <h1 className="text-8xl font-bold font-mono text-white hover:translate-y-1 hover:scale-110 transition linear">Shopping Cart</h1>
        <input className="rounded-xl w-150 px-3 py-2 font-2xl bg-white" type="text" placeholder="Search Products..." onChange={ (event) => {
          let result = products.filter( (product) => product.title.toLowerCase().includes(event.target.value));
          setVisible([...result]);
        } } />
      </div>
      <div className="flex p-10 gap-30 flex-wrap">
        {visible.map( (product) => <div key={product.id} className="w-100 rounded-4xl border border-3 border-green-300 flex flex-col justify-between p-10 gap-5 bg-[#f5eacb] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <img className="rounded-xl place-self-center w-full h-80 w-50" src={product.image} alt={product.title} />
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <h3 className="text-xl">Price ${Math.floor(product.price)}</h3>
          <button className="bg-green-300 border text-white rounded-xl p-3 text-xl cursor-pointer hover:bg-white hover:text-green-300 hover:border hover:border-green-300" onClick={() => dispatch({product:product, type:'ADD'})}>Add to shopping cart</button>
        </div> )}
      </div>
    </div>
  )
}

export default ShoppingCart;