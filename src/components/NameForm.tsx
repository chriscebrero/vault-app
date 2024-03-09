import "../App.css";

type NameFormProps = {
	validateName: (firstName: string) => void;
	name: string;
	label: string;
};

const NameForm = ({ validateName, name, label }: NameFormProps) => {
	return (
		<div className="form-container">
			<h1 className="form-label">{label}</h1>
			<input
				className="form-input"
				type="text"
				value={name}
				onChange={(e) => validateName(e.target.value)}
				maxLength={50}
			/>
		</div>
	);
};

export default NameForm;
