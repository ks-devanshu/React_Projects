import useClient from "./useClient";

export type Product = {
  id: number,
  title: string,
  price: number,
  image: string,
}

class Services {
  getProducts = () => useClient.get<Product[]>('/products')
}

export default new Services();