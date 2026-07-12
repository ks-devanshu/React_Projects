import { Outlet } from 'react-router-dom';
import './App.css'
import cartReducer, { cartContext } from './components/ShoppingCart/cartReducer';
import { useReducer } from 'react';

const App = () => {

  const [data,dispatch] = useReducer(cartReducer,{products:[], totalAmount:0});

  return (
    <cartContext.Provider value={{products:data.products,totalAmount:data.totalAmount, dispatch:dispatch}} >
      <Outlet />
    </cartContext.Provider>
  )
}

export default App;