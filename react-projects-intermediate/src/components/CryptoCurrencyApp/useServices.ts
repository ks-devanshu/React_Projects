import useClient from "./useClient"

export type Coins = {
  id:string,
  market_cap_rank:number,
  name:string,
  symbol:string,
  market_cap:number,
  current_price:number,
  total_supply:number,
  total_volume:number,
  image:string,
}

class Services {
  getCoins = () => {
    return useClient.get<Coins[]>('/coins/markets', {
      params: {
        vs_currency:'usd',
        per_page:250,
      }
    })
  }
}

export default new Services();