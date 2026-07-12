import axios from "axios";


const useClient = axios.create( {
  baseURL: 'https://fakestoreapi.com',
} );

export default useClient;