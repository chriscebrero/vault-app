import "../App.css";

type CorporateNumberFormProps = {
	validate: (e: string) => void;
	value: string;
	isCorpNumValid: boolean;
	setBlurMessageOpen: (e: boolean) => void;
	isBlurActive: boolean;
	validateMessage: string;
};

const CorporateNumberForm = ({
	validate,
	value,
	isCorpNumValid,
	setBlurMessageOpen,
	isBlurActive,
	validateMessage,
}: CorporateNumberFormProps) => {
	return (
		<div className="form-container">
			<h1 className="form-label">Corporate Number</h1>
			<input
				className="form-input"
				type="tel"
				value={value}
				placeholder="Enter Corporation Name here"
				onChange={(e) => validate(e.target.value)}
				maxLength={9}
				onBlur={() => !isCorpNumValid && setBlurMessageOpen(true)}
				onFocus={() => setBlurMessageOpen(false)}
			/>
			{isBlurActive && <h1 className="validate-message">{validateMessage}</h1>}
		</div>
	);
};

export default CorporateNumberForm;
