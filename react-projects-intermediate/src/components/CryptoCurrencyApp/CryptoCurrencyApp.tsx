import { useEffect, useState } from "react";
import useServices, { type Coins } from "./useServices";

const CryptoCurrency = () => {

  const [data, setData] = useState<Coins[]>([]);
  const [visible, setVisible] = useState<Coins[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect( () => {
    useServices.getCoins().then( (res) => {
      setData([...res.data]);
      setVisible([...res.data]);
    });
  }, [] );
  
  return (
    <div className="w-fit mt-10 mx-auto rounded-xl shadow-2xl p-5 flex flex-col items-center gap-10 justify-between">
      <h1 className="font-serif text-5xl font-bold text-blue-500 uppercase">All Cryptocurrencies</h1>
      <input className="rounded-xl px-3 py-2 text-2xl border" placeholder="Search..." type="text" name="search_coin" id="coin_search" onChange={ (event) => {
        let filtered = data.filter( (coin) => coin.name.toLowerCase().includes(event.target.value) || coin.id.toLowerCase().includes(event.target.value) );
        setNotFound(filtered.length === 0)
        setVisible(filtered);
      } } />
      <div>
        <div className="grid justify-items-center grid-cols-[70px_70px_90px_200px_70px_200px_180px] gap-15 mb-5">
          <h2 className="text-2xl font-bold">Rank</h2>
          <h2 className="text-2xl font-bold">Name</h2>
          <h2 className="text-2xl font-bold">Symbol</h2>
          <h2 className="text-2xl font-bold">Market Cap</h2>
          <h2 className="text-2xl font-bold">Price</h2>
          <h2 className="text-2xl font-bold">Available Supply</h2>
          <h2 className="text-2xl font-bold">Volume(24hrs)</h2>
        </div>
        {notFound && <p className="place-self-center text-xl text-red-500 font-bold">No matching coins!</p>}
        {visible.map( (coin, index) => <div key={index} className="grid justify-items-center grid-cols-[70px_70px_90px_200px_70px_200px_180px] gap-15">
          <h3 className="text-xl m-2">{coin.market_cap_rank}</h3>
          <h3 className="text-xl m-2 place-content-end flex"><img className="mx-1 h-10 w-10 rounded-full" src={coin.image} alt="logo" /> {coin.name}</h3>
          <h3 className="text-xl m-2">{coin.symbol}</h3>
          <h3 className="text-xl m-2">${coin.market_cap}</h3>
          <h3 className="text-xl m-2">${coin.current_price}</h3>
          <h3 className="text-xl m-2">{coin.total_supply}</h3>
          <h3 className="text-xl m-2">{coin.total_volume}</h3>
        </div> )}
      </div>
    </div>
  )
}

export default CryptoCurrency;