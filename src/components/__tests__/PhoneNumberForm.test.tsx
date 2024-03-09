import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhoneNumberForm from "../PhoneNumberForm";

const mockedOnChange = jest.fn();

test("Component renders correctly", () => {
	render(<PhoneNumberForm validate={mockedOnChange} value={""} />);

	const component = screen.getByText("Phone Number");
	expect(component).toBeVisible();
});

test("Phone Number renders correctly", async () => {
	render(<PhoneNumberForm validate={mockedOnChange} value={"+14852938374"} />);

	const input = screen.getByRole("textbox");
	expect(input).toHaveDisplayValue("+14852938374");
});

test("Phone Number user event works", async () => {
	render(<PhoneNumberForm validate={mockedOnChange} value={""} />);

	const input = screen.getByRole("textbox");
	userEvent.type(input, "+14852938374");
	expect(mockedOnChange).toHaveBeenCalledTimes(12);
});
