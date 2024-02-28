import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { UserFormReturnType } from "../../helpers/types";

// Testing order-result rendering without special rules
const mockOrderDefault: UserFormReturnType = {
  cartValueSurcharge: 9,
  deliveryDistanceSurcharge: 3,
  numberOfItemsSurcharge: 0.5,
  orderTimeSurcharge: 1,
  orderTotal: 13.5,
  freeOrder: false,
};

// Testing order-result rendering with free-order-rule
const mockOrderFreeDelivery: UserFormReturnType = {
  cartValueSurcharge: 9,
  deliveryDistanceSurcharge: 3,
  numberOfItemsSurcharge: 0.5,
  orderTimeSurcharge: 1,
  orderTotal: 13.5,
  freeOrder: true,
};

// Testing order-result rendering with maximum-surcharge-rule
const mockOrderMaximumSurcharge: UserFormReturnType = {
  cartValueSurcharge: 1,
  deliveryDistanceSurcharge: 12,
  numberOfItemsSurcharge: 2,
  orderTimeSurcharge: 0,
  orderTotal: 15,
  freeOrder: false,
};

describe("<UserForm />", () => {
  it("Should render correctly to the snapshot", () => {
    const { asFragment } = render(<Results orderResults={mockOrderDefault} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should show correctly formatted order details when form values are submitted", () => {
    render(<Results orderResults={mockOrderDefault} />);
    expect(screen.getByTestId("cartValueSurcharge")).toHaveTextContent("9€");
    expect(screen.getByTestId("deliveryDistanceSurcharge")).toHaveTextContent(
      "3€"
    );
    expect(screen.getByTestId("numberOfItemsSurcharge")).toHaveTextContent(
      "0.50€"
    );
    expect(screen.getByTestId("orderTimeSurcharge")).toHaveTextContent("1.00€");
    expect(screen.getByTestId("totalSurcharge")).toHaveTextContent("13.50€");
  });

  it("Should show correct order details when free delivery is activated", () => {
    render(<Results orderResults={mockOrderFreeDelivery} />);
    expect(screen.getByTestId("cartValueSurcharge")).toHaveTextContent("0€");
    expect(screen.getByTestId("deliveryDistanceSurcharge")).toHaveTextContent(
      "0€"
    );
    expect(screen.getByTestId("numberOfItemsSurcharge")).toHaveTextContent(
      "0€"
    );
    expect(screen.getByTestId("orderTimeSurcharge")).toHaveTextContent("0€");
    expect(screen.getByTestId("totalSurcharge")).toHaveTextContent("0€");
    expect(screen.getByTestId("freeDelivery")).toHaveTextContent("FREE ORDER!");
  });

  it("Should show correct order details when maximum surcharge threshold is exceeded", () => {
    render(<Results orderResults={mockOrderMaximumSurcharge} />);
    expect(screen.getByTestId("cartValueSurcharge")).toHaveTextContent("1€");
    expect(screen.getByTestId("deliveryDistanceSurcharge")).toHaveTextContent(
      "12€"
    );
    expect(screen.getByTestId("numberOfItemsSurcharge")).toHaveTextContent(
      "2.00€"
    );
    expect(screen.getByTestId("orderTimeSurcharge")).toHaveTextContent("0.00€");
    expect(screen.getByTestId("totalSurcharge")).toHaveTextContent("15.00€");
    expect(screen.getByTestId("maximumSurcharge")).toHaveTextContent(
      "MAXIMUM-SURCHARGE!"
    );
  });
});
