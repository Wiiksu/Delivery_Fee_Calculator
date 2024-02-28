import { expect, it, describe } from "vitest";
import { render } from "@testing-library/react";
import SubmitBtn from "./SubmitBtn";

describe("<SubmitBtn />", () => {
  it("Should render correctly to the snapshot", () => {
    const { asFragment } = render(
      <SubmitBtn title="Test Title" type="submit" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
