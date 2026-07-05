import { useState } from 'react';
import validator from 'validator';

const CreditCardValidator = () => {  
  const [error, setError] = useState('');
  validator.isCreditCard('1241');

  return (
    <div className="bg-mist-100 w-300 mx-auto shadow-xl mt-50 p-5 py-10 rounded-xl">
      <h1 className="text-6xl font-bold font-serif text-nowrap place-self-center mb-10">Validating <span className="text-red-400">Credit Card</span> in React JS</h1>
      <div className="m-5 place-self-center text-4xl">
        <label className="text-blue-400" htmlFor="card_no">Enter Credit Card: </label>
        <input onChange={(event) => setError(validator.isCreditCard(event.target.value)+"")} className="w-120 px-3 py-1 bg-white rounded-l" type="number" name="card_number" id="card_no"/>
        {error === 'false' && <p className="m-2 text-2xl place-self-center text-red-400">Enter valid credit card number!</p>}
        {error === 'true' && <p className="m-2 text-2xl place-self-center text-green-400">Valid credit card number.</p>}
      </div>
    </div>
  )
}

export default CreditCardValidator;