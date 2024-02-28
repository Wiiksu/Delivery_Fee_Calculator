import { expect, it, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { InputField } from "./InputField";

describe("<InputField />", () => {
  it("Should render correctly to the snapshot", () => {
    const { asFragment } = render(<InputField label="Test Label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should update value on change", () => {
    render(<InputField label="Test Label" />);
    const input = screen.getByTestId("inputField") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(input.value).toBe("New Value");
  });

  it("Should call onChange handler", () => {
    const handleChange = vi.fn();
    render(<InputField label="Test Label" onChange={handleChange} />);
    const input = screen.getByTestId("inputField") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("Should display error-message", () => {
    const errorMessage = "Error message";
    render(<InputField label="Test Label" errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("Should forward ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputField label="Test Label" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
