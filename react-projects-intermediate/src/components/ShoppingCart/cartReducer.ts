import type { Dispatch } from "react";
import type { Product } from "./useServices";
import React from "react";

interface Action {
  product:Product,
  type: 'ADD'|'REMOVE'|'INCREMENT'|'DECREMENT'
}

export interface CartContextType {
  products:{product:Product, quantity:number}[],
  totalAmount:number,
  dispatch: Dispatch<Action>;
}

export type data = {
  products:{product:Product, quantity:number}[],
  totalAmount: number,
}

const cartReducer = (value:data, action:Action):data => {
  if (action.type === 'ADD') {
    let updated:boolean = false;
    let temp = [...value.products.map( (product) => {
      if (product.product.id === action.product.id) {
        updated = true;
        return {product:product.product, quantity:product.quantity+1};
      }
      else
        return product;
    } )];
    if (updated)
      return {products:[...temp], totalAmount:value.totalAmount+Math.floor(action.product.price) };
    return {products:[...value.products, {product:action.product ,quantity:1}], totalAmount:value.totalAmount+Math.floor(action.product.price)};
  }
  if (action.type === 'REMOVE') {
    return {products:[...value.products.filter((each) => each.product.id !== action.product.id)],totalAmount:value.totalAmount-Math.floor(action.product.price)};
  }
  if (action.type === 'INCREMENT') {
    return {products:[...value.products.map( (each) => each.product.id === action.product.id ? {...each, quantity:each.quantity+1} : each )], totalAmount:value.totalAmount+Math.floor(action.product.price)};
  }
  if (action.type === 'DECREMENT') {
    return {products:[...value.products.map( (each) => each.product.id === action.product.id ? {...each, quantity:each.quantity-1} : each )], totalAmount:value.totalAmount-Math.floor(action.product.price)};
  }

  return {products:value.products, totalAmount:value.totalAmount};
}

const cartContext = React.createContext<CartContextType>({} as CartContextType);

export default cartReducer;
export {cartContext};