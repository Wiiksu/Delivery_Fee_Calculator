import { expect, it, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";

// Testing if invalid value(s) prevent from submitting
const MOCK_INVALID_VALUES = {
  cartValue: -1,
  deliveryDistance: 1000,
  numberOfItems: 4,
  orderTime: "2024-02-23T15:00",
};

// Testing if valid values pass on after submitting the form
const MOCK_VALID_VALUES = {
  cartValue: 9,
  deliveryDistance: 1500,
  numberOfItems: 13,
  orderTime: "2024-02-23T15:00",
};

describe("<UserForm />", () => {
  const mockSaveCalculationResults = vi.fn();

  beforeEach(() => {
    render(<UserForm saveCalculationResults={mockSaveCalculationResults} />);
  });

  it("Should render correctly to the snapshot", () => {
    const { asFragment } = render(
      <UserForm saveCalculationResults={mockSaveCalculationResults} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Renders form fields correctly", () => {
    expect(screen.getByTestId("cartValue")).toBeInTheDocument();
    expect(screen.getByTestId("deliveryDistance")).toBeInTheDocument();
    expect(screen.getByTestId("numberOfItems")).toBeInTheDocument();
    expect(screen.getByTestId("orderTime")).toBeInTheDocument();
  });

  it("Shows error-messages if fields are empty and form is submitted", async () => {
    fireEvent.click(screen.getByTestId("submitButton"));
    await waitFor(() => {
      expect(screen.getByText("Cart value is required")).toBeInTheDocument();
      expect(
        screen.getByText("Delivery distance is required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Amount of items is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Valid time is required")).toBeInTheDocument();
    });
  });

  it("Should not submit formdata if a field value is invalid", async () => {
    fireEvent.change(screen.getByTestId("cartValue"), {
      target: { value: MOCK_INVALID_VALUES.cartValue },
    });
    fireEvent.change(screen.getByTestId("deliveryDistance"), {
      target: { value: MOCK_INVALID_VALUES.deliveryDistance },
    });
    fireEvent.change(screen.getByTestId("numberOfItems"), {
      target: { value: MOCK_INVALID_VALUES.numberOfItems },
    });
    fireEvent.change(screen.getByTestId("orderTime"), {
      target: { value: MOCK_INVALID_VALUES.orderTime },
    });

    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(mockSaveCalculationResults).not.toHaveBeenCalled();
    });
  });

  it("Should submit formdata if a field values are valid", async () => {
    fireEvent.change(screen.getByTestId("cartValue"), {
      target: { value: MOCK_VALID_VALUES.cartValue },
    });
    fireEvent.change(screen.getByTestId("deliveryDistance"), {
      target: { value: MOCK_VALID_VALUES.deliveryDistance },
    });
    fireEvent.change(screen.getByTestId("numberOfItems"), {
      target: { value: MOCK_VALID_VALUES.numberOfItems },
    });
    fireEvent.change(screen.getByTestId("orderTime"), {
      target: { value: MOCK_VALID_VALUES.orderTime },
    });

    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(mockSaveCalculationResults).toHaveBeenCalled();
    });
  });
});
