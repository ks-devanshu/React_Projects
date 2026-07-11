import axios from "axios";

const useClient = axios.create( {
  baseURL: 'https://api.coingecko.com/api/v3/'
} );

export default useClient;