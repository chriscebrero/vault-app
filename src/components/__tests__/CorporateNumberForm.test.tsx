import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CorporateNumberForm from "../CorporateNumberForm";

const mockedOnChange = jest.fn();

test("has correct welcome text", () => {
	render(
		<CorporateNumberForm
			validate={() => jest.fn()}
			value={"826417395"}
			isCorpNumValid={true}
			setBlurMessageOpen={() => jest.fn()}
			isBlurActive={false}
			validateMessage="hi"
		/>
	);

	const input = screen.getByPlaceholderText("Enter Corporation Name here");
	expect(input).toBeVisible();
});

test("userEvent occurs", async () => {
	render(
		<CorporateNumberForm
			validate={mockedOnChange}
			value={""}
			isCorpNumValid={true}
			setBlurMessageOpen={() => jest.fn()}
			isBlurActive={false}
			validateMessage="Invalid Corporation Number"
		/>
	);

	const input = screen.getByPlaceholderText("Enter Corporation Name here");
	userEvent.type(input, "826417395");
	expect(mockedOnChange).toHaveBeenCalledTimes(9);
});

test("blur message appears", () => {
	render(
		<CorporateNumberForm
			validate={mockedOnChange}
			value={"126417395"}
			isCorpNumValid={false}
			setBlurMessageOpen={() => jest.fn()}
			isBlurActive={true}
			validateMessage="Invalid Corporation Number"
		/>
	);

	const input = screen.getByText("Invalid Corporation Number");
	expect(input).toBeVisible();
});

test("blur message does not appear when isBlurMessageOpen is false", () => {
	render(
		<CorporateNumberForm
			validate={mockedOnChange}
			value={"126417395"}
			isCorpNumValid={false}
			setBlurMessageOpen={() => jest.fn()}
			isBlurActive={false}
			validateMessage="Invalid Corporation Number"
		/>
	);

	const input = screen.queryByText(/Invalid Corporation Number/i);
	expect(input).not.toBeInTheDocument();
});
