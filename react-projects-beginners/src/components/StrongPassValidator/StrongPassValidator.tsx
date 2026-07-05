import { useState } from "react";
import validator from "validator";


const StrongPasswordValidator = () => {
  const [error, setError] = useState('');
    validator.isCreditCard('1241');
  
    return (
      <div className="bg-mist-100 w-300 mx-auto shadow-xl mt-50 p-5 py-10 rounded-xl">
        <h1 className="text-6xl font-bold font-serif text-nowrap place-self-center mb-10">Validating <span className="text-red-400">Strong Password</span> in React JS</h1>
        <div className="m-5 place-self-center text-4xl">
          <label className="text-blue-400" htmlFor="pass">Enter Password: </label>
          <input onChange={(event) => setError(validator.isStrongPassword(event.target.value)+"")} className="w-120 px-3 py-1 bg-white rounded-l" type="text" name="password" id="pass"/>
          {error === 'false' && <p className="m-2 text-2xl place-self-center text-red-400">Not a strong password!</p>}
          {error === 'true' && <p className="m-2 text-2xl place-self-center text-green-400">Strong password.</p>}
        </div>
      </div>
    )
}

export default StrongPasswordValidator;