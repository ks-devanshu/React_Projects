
export type DetailsShape = {
  name:string,
	email:string,
	contact:string,
  profession:string,
	interest:string,
	reference:string,
}

interface ReviewDetailsProps {
  props:DetailsShape;
  setCurrentPage: React.Dispatch<number>;
}

const ReviewDetails = ( {props:{name, email, contact, profession, interest, reference},setCurrentPage}: ReviewDetailsProps ) => {
  return (
    <div className="bg-yellow-100 shadow-xl rounded-xl flex flex-col w-150 mx-auto mt-20 p-5">
      <h2 className="font-bold text-5xl my-4">Entered Details</h2>
      <h3 className="font-bold text-2xl my-2">Name: <span className="font-normal">{name}</span></h3>
      <h3 className="font-bold text-2xl my-2">Email: <span className="font-normal">{email}</span></h3>
      <h3 className="font-bold text-2xl my-2">Contact No.: <span className="font-normal">{contact}</span></h3>

      <h2 className="font-bold text-5xl my-4">Responses</h2>
      <h3 className="font-bold text-2xl my-2">Profession: <span className="font-normal">{profession}</span></h3>
      <h3 className="font-bold text-2xl my-2">Intrests: <span className="font-normal">{interest}</span></h3>
      <h3 className="font-bold text-2xl my-2">Reference: <span className="font-normal">{reference}</span></h3>

      <button className="bg-green-400 text-white rounded-l font-bold cursor-pointer my-4 w-25 h-8" onClick={ () => setCurrentPage(4) }>Submit</button>

      <div className="join self-center">
        <button className="join-item w-10 text-xl cursor-pointer " onClick={() => setCurrentPage(1)} >1</button>
        <button className="join-item w-10 text-xl cursor-pointer" onClick={() => setCurrentPage(2)}>2</button>
        <button className="join-item w-10 text-xl bg-blue-400 text-white " disabled={true}>3</button>
      </div>
    </div>
  )
}

export default ReviewDetails;