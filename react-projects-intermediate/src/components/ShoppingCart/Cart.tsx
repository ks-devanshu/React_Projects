import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { cartContext } from "./cartReducer";

const Cart = () => {

  const {products, totalAmount, dispatch} = useContext(cartContext);

  return (
    <div className="flex flex-col bg-[#f5eacb] rounded-2xl border border-3 border-green-700 mx-auto w-140 items-center mt-10 p-10 gap-5 relative">
      <NavLink to={'/'} className="absolute top-2 left-2 text-5xl" >🢦</NavLink>
      <h1 className="text-5xl font-bold font-mono text-green-700">My Cart</h1>
      
      {products.map( (product) => <div className="w-full" key={product.product.id}>
        <div className="flex w-full justify-evenly items-center">
          <img className="w-25 h-25 rounded-full" src={product.product.image} alt="img" />
          <div className="flex flex-col">
            <h2 className="text-xl w-50 text-wrap">{product.product.title}</h2>
            <h3 className="text-xl font-bold">Price ${Math.floor(product.product.price)*product.quantity}</h3>
          </div>
        </div>
        <div className="flex items-center w-full justify-evenly">
          <button className="bg-green-700 text-white font-bold rounded-xl w-fit p-3 cursor-pointer" onClick={ () => dispatch({product:product.product, type:'REMOVE'}) }>Remove Product</button>
          <div className="flex gap-5 items-center">
            <button className="bg-blue-300 rounded-full w-10 h-10 text-white cursor-pointer disabled:cursor-not-allowed" disabled={product.quantity === 1} onClick={ () => {
              dispatch({product:product.product, type:'DECREMENT'})
            } }>-</button>
            <p className="text-xl font-bold">{product.quantity}</p>
            <button className="bg-blue-300 rounded-full w-10 h-10 text-white cursor-pointer" onClick={ () => {
              dispatch({product:product.product, type:'INCREMENT'})
            } }>+</button>
          </div>
        </div>
        <div className="bg-black h-1 w-full my-3"></div>
      </div> )}

      <h2 className="place-self-end text-3xl">Total Amount: ${totalAmount}</h2>
      <button className="rounded-3xl bg-green-500 text-white p-2 px-5 place-self-end cursor-pointer">Proceed to Payment</button>

    </div>
  )
}

export default Cart;