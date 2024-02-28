import { expect, it, describe, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Information from "./Information";

describe("<Information />", () => {
  beforeEach(() => {
    render(<Information />);
  });

  it("Should render correctly to the snapshot", () => {
    const { asFragment } = render(<Information />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should have main dropdown-title visible", () => {
    expect(screen.getByTestId("mainItemTitle")).toBeInTheDocument();
  });

  it("Should open the sub-dropdown-titles when clicking the main-title", () => {
    fireEvent.click(screen.getByTestId("mainItemTitle"));
    expect(screen.getByText("Cart Value")).toBeInTheDocument();
  });

  it("Should open the sub-information-content when clicking on the sub-information title", () => {
    fireEvent.click(screen.getByTestId("mainItemTitle"));
    fireEvent.click(screen.getByText("Cart Value"));
    expect(
      screen.getByText(
        "If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€."
      )
    ).toBeInTheDocument();
  });
});
