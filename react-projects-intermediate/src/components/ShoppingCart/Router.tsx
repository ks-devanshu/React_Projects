import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import Cart from "./Cart";
import App from "../../App";


const router = createBrowserRouter([
  {path:'/', element:<App />,
    children:[
      {path:'',element:<ShoppingCart />},
      {path:'cart',element:<Cart />}
    ]
  },
]);

export default router;