import React from "react";
import "../App.css";
import axios from "axios";
import CorporateNumberForm from "./CorporateNumberForm";
import NameForm from "./NameForm";
import PhoneNumberForm from "./PhoneNumberForm";

const OnboardingFormApp = () => {
	const [firstName, setFirstName] = React.useState("");
	const [firstNameValid, setFirstNameValid] = React.useState(false);

	const [lastName, setLastName] = React.useState("");
	const [lastNameValid, setLastNameValid] = React.useState(false);

	const [corporationNumber, setCorporationNumber] = React.useState("");
	const [corporationNumberValid, setCorporationNumberValid] =
		React.useState(false);
	const [isBlurActive, setBlurActive] = React.useState(false);
	const [blurMessage, setBlurMessage] = React.useState("");

	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [phoneNumberValid, setPhoneNumberValid] = React.useState(false);

	const validateFirstName = (name: string) => {
		setFirstName(name);
		const letters = /^[A-Za-z]+$/;
		if (name.match(letters)) {
			setFirstNameValid(true);
		} else {
			setFirstNameValid(false);
		}
	};

	const validateLastName = (name: string) => {
		setLastName(name);
		const letters = /^[A-Za-z]+$/;
		if (name.match(letters)) {
			setLastNameValid(true);
		} else {
			setLastNameValid(false);
		}
	};

	const validateCorporationNumber = async (cn: string) => {
		setCorporationNumber(cn);
		if (cn.length === 9) {
			try {
				const call = await axios.get(
					`https://front-end-home-task-api.onrender.com/corporation-number/${cn}`
				);
				if (call.data.valid) {
					console.log("valid");
					setCorporationNumberValid(true);
				}
			} catch (error) {
				console.log(error);
				setBlurMessage("Invalid Corporation Number");
				setCorporationNumberValid(false);
			}
		}
	};

	const validatePhoneNumber = (pn: string) => {
		setPhoneNumber(pn);
		if (pn.length === 12) {
			if (pn.substring(0, 2) !== "+1") {
				setPhoneNumberValid(false);
				console.log(
					"Please put in a Canadian Number with the correct area code"
				);
			} else {
				setPhoneNumberValid(true);
			}
		}
	};

	const handlePostRequest = async () => {
		if (
			firstNameValid &&
			lastNameValid &&
			corporationNumberValid &&
			phoneNumberValid
		) {
			try {
				const req = await axios.post(
					"https://front-end-home-task-api.onrender.com/profile-details",
					{
						firstName,
						lastName,
						corporationNumber,
						phone: phoneNumber,
					}
				);
				console.log(req);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="container">
			<h2>Onboarding Form</h2>
			<div className="name-container">
				<NameForm
					validateName={validateFirstName}
					name={firstName}
					label="First Name"
				/>
				<NameForm
					validateName={validateLastName}
					name={lastName}
					label="Last Name"
				/>
			</div>
			<PhoneNumberForm validate={validatePhoneNumber} value={phoneNumber} />
			<CorporateNumberForm
				value={corporationNumber}
				validate={validateCorporationNumber}
				isCorpNumValid={corporationNumberValid}
				setBlurMessageOpen={setBlurActive}
				isBlurActive={isBlurActive}
				validateMessage={blurMessage}
			/>
			<button className="submit-button" onClick={() => handlePostRequest()}>
				Submit
			</button>
		</div>
	);
};

export default OnboardingFormApp;
