import { useState } from "react";
import AdditionalDetails, { type AdditionalDetailsShape } from "./AdditionalDetails";
import BasicDetails, { type BasicDetailsShape } from "./BasicDetails";
import ReviewDetails, { type DetailsShape } from "./ReviewDetails";
import ThankYouPage from "./ThankYouPage";

const SurveyForm = () => {

	const [currentPage, setCurrentPage] = useState(1);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [profession, setProfession] = useState('');
	const [interest, setInterest] = useState('');
	const [reference, setReference] = useState('');

	const basicDetails:BasicDetailsShape = {
		name: name,
		setName: setName,
		email: email,
		setEmail: setEmail,
		contact: contact,
		setContact: setContact,
		setCurrentPage: setCurrentPage
	}

	const additionalDetails:AdditionalDetailsShape = {
		profession: profession,
		setProfession: setProfession,
		interest: interest,
		setInterest: setInterest,
		reference: reference,
		setReference: setReference,
		setCurrentPage: setCurrentPage
	}

	const reviewDetails:DetailsShape = {
		name: name,
		email: email,
		contact: contact,
		profession: profession,
		interest: interest,
		reference: reference
	}

	return (
		<>
		{currentPage == 1 ? <BasicDetails props={basicDetails} /> : currentPage == 2 ? <AdditionalDetails props={additionalDetails} /> : currentPage == 3 ? <ReviewDetails props={reviewDetails} setCurrentPage={setCurrentPage} /> : <ThankYouPage />}
		</>
	)
}

export default SurveyForm;