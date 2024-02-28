import { ButtonPropTypes } from "../../helpers/types";

export default function SubmitBtn(buttonProps: ButtonPropTypes) {
  return (
    <button
      className="bg-purple-500 text-purple-50 text-lg border-2 border-purple-50 border-opacity-60 font-semibold py-1 px-2 rounded-md hover:bg-purple-600"
      type={buttonProps.type}
      data-testid={"submitButton"}
    >
      {buttonProps.title}
    </button>
  );
}
