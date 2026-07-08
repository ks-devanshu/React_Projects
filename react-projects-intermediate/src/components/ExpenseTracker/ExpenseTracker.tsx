import { useEffect, useRef, useState } from 'react';
import validator from 'validator';

interface expenseShape {
  id:number,
  label:string,
  amount:number,
  category: 'EXPENSE' | 'BUDGET',
}

// const dummy:expenseShape[] = [
//   { id:1, label:'Gifts', amount:30, category:'EXPENSE' },
//   { id:2, label:'Added', amount:40, category:'BUDGET' },
//   { id:3, label:'Util', amount:50, category:'EXPENSE' },
//   { id:4, label:'Added', amount:60, category:'BUDGET' }
// ];

const ExpenseTracker = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [expenses, setExpenses] = useState<expenseShape[]>([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [visibleExpenses, setVisibleExpenses] = useState<expenseShape[]>([]);
  const [emptySearch , setEmptySearch] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [catgHelper, setCatgHelper] = useState<'EXPENSE'|'BUDGET'>('EXPENSE');

  const amountRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  useEffect( () => {
    let totalExp = 0;
    let totalBud = 0;
    for (let record of expenses) {
      if (record.category === 'EXPENSE')
        totalExp += record.amount;
      else
        totalBud += record.amount;
    }
    setBalance(totalBud-totalExp);
    setTotalSpend(totalExp);
    setTotalBudget(totalBud);
    
  }, [expenses] );

  const addExpense = (label:string, amount:number, category:'EXPENSE'|'BUDGET') => {
    setExpenses( [...expenses, {id:expenses.length+1, label:label, amount:amount, category:category}] );
    setVisibleExpenses( [...expenses, {id:expenses.length+1, label:label, amount:amount, category:category}] );
  }

  const removeExpense = (id:number) => {
    setExpenses( expenses.filter( (record) => record.id !== id ) );
    setVisibleExpenses( expenses.filter( (record) => record.id !== id ) );
  }

  const searchRecord = (literal:string) => {
    let temp = expenses.filter( (record) => record.label.toLowerCase().includes(literal.toLowerCase()) );
    setVisibleExpenses(temp);
    if (temp.length === 0)
      setEmptySearch(true);
    else
      setEmptySearch(false);
  }

  return (
    <div className='w-100 border shadow-2xl lg:w-200 mx-auto m-5 rounded-xl flex flex-col items-center p-5'>
      <h1 className='text-7xl font-bold font-mono m-5'>Expense Tracker</h1>

      <div className='flex justify-between w-full px-2'>
      <h2 className='text-3xl grow-1'>Balance <span className='font-bold text-blue-500'>${balance}</span></h2>
      <button className={'border font-bold text-xl p-2 px-8 rounded-xl cursor-pointer '+(isAdding ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500')} onClick={ () => {
        if (isAdding)
          setInvalidAmount(false);
        setIsAdding(!isAdding)
        } } >{isAdding ? 'Cancel' : 'Add'}</button>
      </div>

      {isAdding && <div className='flex flex-col border rounded-xl w-full my-4'>
        <input ref={amountRef} className='rounded-xl text-2xl border mx-8 my-4 p-4' placeholder='3000' type="text" name='amount' id='amt' onChange={ (event) =>
          setInvalidAmount(!validator.isFloat(event.target.value, {min:0})) } />
        {invalidAmount && <p className='text-red-500 mx-8'>Invalid Amount!</p>}
        <input ref={labelRef} className='rounded-xl text-2xl border mx-8 my-4 p-4' placeholder='Grocery' defaultValue='Misc' type="text" name="label" id="lbl" />
        <div className='place-self-center flex items-center'>
          <input className='h-5 w-5 cursor-pointer' type="radio" name="type" id="tnsExpense" value={'EXPENSE'} defaultChecked={true} onChange={
            (event) => setCatgHelper(event.target.value === 'EXPENSE' ? 'EXPENSE' :  'BUDGET')
          } />
          <label className='mx-4 cursor-pointer' htmlFor="tnsExpense">Expense</label>
          <input className='h-5 w-5 cursor-pointer' type="radio" name="type" id="tnsBudget" value={'BUDGET'} checked={catgHelper === 'BUDGET'} onChange={
            (event) => setCatgHelper(event.target.value === 'EXPENSE' ? 'EXPENSE' : 'BUDGET')
          } />
          <label className='mx-4 cursor-pointer' htmlFor="tnsBudget">Budget</label>
        </div>
        <button className='border border-green-500 text-green-500 font-bold text-xl p-2 px-8 rounded-xl cursor-pointer w-fit place-self-center m-5' onClick={ () =>
          {
            if (amountRef.current && !amountRef.current.value)
              setInvalidAmount(true);
            if (labelRef.current && amountRef.current && labelRef.current.value && amountRef.current.value && catgHelper) {
              addExpense(labelRef.current.value, parseInt(amountRef.current.value), catgHelper);
              labelRef.current.value = '';
              amountRef.current.value = '';
              setCatgHelper('EXPENSE');
              setIsAdding(false);
            }
          }
        } >Add Transaction</button>
      </div>}

      <div className='flex gap-2 my-3 w-full relative'>
        <div className='rounded-xl grow-1 px-5 py-2 border'>
          <h2>Expense</h2>
          <h2 className='text-3xl text-red-500 font-bold'>${totalSpend}</h2>
        </div>
        <div className='rounded-xl grow-1 px-5 py-2 border'>
          <h2>Budget</h2>
          <h2 className='text-3xl text-green-500 font-bold'>${totalBudget}</h2>
        </div>
      </div>

      <h2 className='text-2xl place-self-start my-3 font-bold'>Transactions</h2>
      <div className='flex flex-col w-full'>
        <input className='rounded-xl bg-gray-200 p-4 grow-1 mb-5' type="text" placeholder='Search here' name="search" id="srch" onChange={ (event) => {
          if (expenses.length === 0)
            return;
          
          if (validator.isEmpty(event.target.value)) {
            setEmptySearch(true);
            setVisibleExpenses(expenses);
          }
          else
            searchRecord(event.target.value);
        }
        } 
        onBlur={ (event) => {
          if (event.target.value && expenses.length < 1)
            event.target.value = '';
          else if (!event.target.value)
            setEmptySearch(false);
        }}
         />
        {emptySearch && <h3 className='text-red-500 font-bold text-2xl'>No matching records!</h3>}

        { visibleExpenses.map( (record) => <div key={record.id} className={'grid border w-full p-4 grid-cols-3 justify-items-center text-xl rounded-xl border-r-8 my-2 '+(record.category === 'EXPENSE' ? 'border-r-red-500' : 'border-r-green-500')}>
          <h3 className='self-center justify-self-start'>{record.label}</h3>
          <h3 className={'self-center font-bold '+(record.category === 'EXPENSE' ? 'text-red-500' : 'text-green-500')}>${record.amount}</h3>
          <button className='w-30 border border-blue-500 text-blue-500 font-bold text-l p-2 rounded-xl cursor-pointer self-center justify-self-end ' onClick={ () => removeExpense(record.id) } >Remove</button>
        </div> ) }
      </div>
    </div>
  )
}

export default ExpenseTracker;