import "../App.css";

type PhoneNumberFormProps = {
	validate: (e: string) => void;
	value: string;
};

const PhoneNumberForm = ({ validate, value }: PhoneNumberFormProps) => {
	return (
		<div className="form-container">
			<h1 className="form-label">Phone Number</h1>
			<input
				className="form-input"
				type="tel"
				value={value}
				onChange={(e) => validate(e.target.value)}
				maxLength={12}
			/>
		</div>
	);
};

export default PhoneNumberForm;
