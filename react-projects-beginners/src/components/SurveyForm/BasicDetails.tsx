import { useRef, useState } from "react";
import validator from 'validator';

export type BasicDetailsShape = {
	name:string,
	email:string,
	contact:string,
  setName: React.Dispatch<string>;
  setEmail: React.Dispatch<string>;
  setContact: React.Dispatch<string>;
  setCurrentPage: React.Dispatch<number>;
}

interface BasicDetailsProps {
  props:BasicDetailsShape
}

const BasicDetails = ( {props:{name, setName, email, setEmail, contact, setContact, setCurrentPage}} : BasicDetailsProps ) => {

  const [mailError, setMailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [nameError, setNameError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-yellow-100 shadow-xl rounded-xl flex flex-col w-150 mx-auto mt-20 p-5">
      <h2 className="font-bold text-5xl my-4">Basic Details</h2>
      <h3 className="font-bold text-2xl my-2">1. <span className="font-normal">Name</span></h3>
      <input ref={nameRef} className="p-3 h-8 bg-gray-200 rounded-l" type="text" name="name" onFocus={ (event) => {
        setNameError(!validator.isEmpty(event.target.value)+'');
      } } onChange={ (event) => {
        setNameError(validator.isLength(event.target.value, 3)+"");
      } } defaultValue={name}/>
      {nameError === 'false' && <p className="text-red-500">Not a valid name</p>}
      <h3 className="font-bold text-2xl my-2">2. <span className="font-normal">Email</span></h3>
      <input ref={mailRef} className="p-3 h-8 bg-gray-200 rounded-l" type="text" name="email" onFocus={ (event) => {
        setMailError(!validator.isEmpty(event.target.value)+'');
      } } onChange={ (event) => {
        setMailError(validator.isEmail(event.target.value)+'');
      } } defaultValue={email} />
      {mailError === 'false' && <p className="text-red-500">Not a valid email</p>}
      <h3 className="font-bold text-2xl my-2">3. <span className="font-normal">Contact</span></h3>
      <input ref={contactRef} className="p-3 h-8 bg-gray-200 rounded-l" type="text" name="contact" onFocus={ (event) => {
        setContactError(!validator.isEmpty(event.target.value)+'');
      } } onChange={ (event) => {
        setContactError(validator.isMobilePhone(event.target.value)+'');
      } } defaultValue={contact}/>
      {contactError === 'false' && <p className="text-red-500">Not a valid contact</p>}
      <button className="bg-green-400 text-white rounded-l font-bold cursor-pointer my-4 w-25 h-8" onClick={() => {
        if (nameRef.current && mailRef.current && contactRef.current && nameRef.current.value && mailRef.current.value && contactRef.current.value) {
          setName(nameRef.current.value);
          setEmail(mailRef.current.value);
          setContact(contactRef.current.value);
          setCurrentPage(2);
        }
      }} >Next</button>

      <div className="join self-center">
        <button className="join-item w-10 text-xl bg-blue-400 text-white" disabled={true}>1</button>
        <button className="join-item w-10 text-xl cursor-pointer disabled:cursor-not-allowed" disabled={!(name && email && contact)} onClick={() => setCurrentPage(2)}>2</button>
        <button className="join-item w-10 text-xl cursor-pointer disabled:border disabled:cursor-not-allowed" disabled={!(name && email && contact)} onClick={() => setCurrentPage(3)}>3</button>
      </div>
    </div>
  )
}

export default BasicDetails;