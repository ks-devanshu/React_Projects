
export type AdditionalDetailsShape = {
	profession:string,
	interest:string,
	reference:string,
	setProfession: React.Dispatch<string>,
  setInterest: React.Dispatch<string>,
  setReference: React.Dispatch<string>,
  setCurrentPage: React.Dispatch<number>
}

interface AdditionalDetailsProps {
  props:AdditionalDetailsShape
}

const AdditionalDetails = ( {props:{profession, interest, reference, setProfession, setInterest, setReference, setCurrentPage}}: AdditionalDetailsProps ) => {

  return (
    <div className="bg-yellow-100 shadow-xl rounded-xl flex flex-col w-150 mx-auto mt-20 p-5">
      <h2 className="font-bold text-5xl my-4">Additional Details</h2>
      <h3 className="font-bold text-2xl my-2">1. <span className="font-normal">What is your profession?</span></h3>
      <div  className="border-b-3 mb-5 pb-5 px-3">
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={profession === 'Student'} value={'Student'} name="profession" id="student" onChange={ (event) => {
          setProfession(event.target.value);
        } } />
        <label className="w-fit text-xl" htmlFor="student">Student</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={profession === 'Software Engineer'} value={'Software Engineer'} name="profession" id="se" onChange={ (event) => {
          setProfession(event.target.value);
        } } />
        <label className="w-fit text-xl" htmlFor="se">Software Engineer</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={profession === 'Teacher'} value={'Teacher'} name="profession" id="teacher" onChange={ (event) => {
          setProfession(event.target.value);
        } } />
        <label className="w-fit text-xl" htmlFor="teacher">Teacher</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={profession === 'Other' || !(profession === 'Student' || profession === 'Software Engineer' || profession === 'Teacher' || profession === '')} value={'Other'} name="profession" id="other_profession" onChange={ (event) => {
          setProfession(event.target.value);
        } } />
        <label className="w-fit text-xl" htmlFor="other_profession">Others:</label> <br />
        <input onChange={(event) => setProfession(event.target.value)} defaultValue={(profession === 'Student' || profession === 'Software Engineer' || profession === 'Teacher' || profession === 'Other') ? '' : profession} disabled={!profession || profession === 'Student' || profession === 'Software Engineer' || profession === 'Teacher'} className="p-3 w-10/10 h-8 bg-gray-200 rounded-l" type="text" name="other_profession" />
      </div>

      <h3 className="font-bold text-2xl my-2">2. <span className="font-normal">What is your interest?</span></h3>
      <div  className="border-b-3 mb-5 pb-5 px-3">
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={interest === 'DSA'} name="interest" id="dsa" value={'DSA'} onChange={ (event) => setInterest(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="dsa">DSA</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={interest === 'Full Stack Development'} name="interest" id="fsd" value={'Full Stack Development'} onChange={ (event) => setInterest(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="fsd">Full Stack Development</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={interest === 'Data Science'} name="interest" id="ds" value={'Data Science'} onChange={ (event) => setInterest(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="ds">Data Science</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={interest === 'Competitive Programming'} name="interest" id="cp" value={'Competitive Programming'} onChange={ (event) => setInterest(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="cp">Competitive Programming</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={interest === 'Other' || !(interest === 'DSA' || interest === 'Full Stack Development' || interest === 'Data Science' || interest === 'Competitive Programming'|| interest === '')} name="interest" id="other_interest" value={'Other'} onChange={ (event) => {
          setInterest(event.target.value);
        } }/>
        <label className="w-fit text-xl" htmlFor="other_interest">Others:</label> <br />
        <input onChange={(event) => setInterest(event.target.value)} defaultValue={(interest === 'DSA' || interest === 'Full Stack Development' || interest === 'Data Science' || interest === 'Competitive Programming' || interest === 'Other') ? '' : interest} disabled={!interest || interest === 'DSA' || interest === 'Full Stack Development' || interest === 'Data Science' || interest === 'Competitive Programming'} className="p-3 w-10/10 h-8 bg-gray-200 rounded-l" type="text" name="other_interest" />
      </div>

      <h3 className="font-bold text-2xl my-2">3. <span className="font-normal">Where did you hear about us?</span></h3>
      <div className="mb-5 px-3">
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={reference === 'News Paper'} name="reference" id="news" value={'News Paper'} onChange={ (event) => setReference(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="news">News Paper</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={reference === 'LinkedIn'} name="reference" id="linkedin" value={'LinkedIn'} onChange={ (event) => setReference(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="linkedin">LinkedIn</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={reference === 'Instagram'} name="reference" id="instagram" value={'Instagram'} onChange={ (event) => setReference(event.target.value) }/>
        <label className="w-fit text-xl" htmlFor="instagram">Instagram</label> <br />
        <input className="w-4 h-4 m-1" type="radio" defaultChecked={reference === 'Other' || !(reference === 'News Paper' || reference === 'LinkedIn' || reference === 'Instagram' || reference === '')} name="reference" id="other_reference" value={'Other'} onChange={ (event) => {
          setReference(event.target.value);
        } }/>
        <label className="w-fit text-xl" htmlFor="other_reference">Others:</label> <br />
        <input onChange={(event) => setReference(event.target.value)} defaultValue={(reference === 'News Paper' || reference === 'LinkedIn' || reference === 'Instagram' || reference === 'Other') ? '' : reference} disabled={!reference || reference === 'News Paper' || reference === 'LinkedIn' || reference === 'Instagram'} className="p-3 w-10/10 h-8 bg-gray-200 rounded-l" type="text" name="other_reference" />
      </div>

      <button className="bg-green-400 text-white rounded-l font-bold cursor-pointer my-4 w-25 h-8" onClick={() => {
        if (profession && interest && reference)
          setCurrentPage(3);
      }} >Next</button>

      <div className="join self-center">
        <button className="join-item w-10 text-xl cursor-pointer " onClick={() => setCurrentPage(1)} >1</button>
        <button className="join-item w-10 text-xl bg-blue-400 text-white " disabled={true}>2</button>
        <button className="join-item w-10 text-xl cursor-pointer disabled:border disabled:cursor-not-allowed" disabled={!(profession && interest && reference)} onClick={() => setCurrentPage(3)}>3</button>
      </div>
    </div>
  )
}

export default AdditionalDetails;