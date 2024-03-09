import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NameForm from "../NameForm";

const mockSetName = jest.fn();

test("Component renders correctly", () => {
	render(
		<NameForm validateName={mockSetName} name="Test" label="First Name" />
	);

	const component = screen.getByText("First Name");
	expect(component).toBeVisible();
	const input = screen.getByRole("textbox");
	expect(input).toHaveDisplayValue("Test");
});

test("Component renders correctly", () => {
	render(<NameForm validateName={mockSetName} name="" label="First Name" />);

	const component = screen.queryByText(/Test/i);
	expect(component).not.toBeInTheDocument();
});

test("setName is called", () => {
	render(<NameForm validateName={mockSetName} name="" label="First Name" />);

	const input = screen.getByRole("textbox");
	userEvent.type(input, "Test");
	expect(mockSetName).toHaveBeenCalledTimes(4);
});
