import { useState } from "react";
import UserForm from "./components/userform/UserForm";
import { UserFormReturnType } from "./helpers/types";
import Results from "./components/results/Results";
import Information from "./components/information/Information";

export default function App() {
  const [calculationResults, setCalculationResults] =
    useState<UserFormReturnType>();

  const appTitle = "delivery fee app";

  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-12">
      <div className="flex flex-col gap-3 h-fit min-w-fit p-3">
        <h1 className="text-4xl font-extrabold text-purple-400 text-center select-none w-[22rem] md:w-[27rem] tracking-wide">
          {appTitle.toUpperCase()}
        </h1>
        <div className="flex flex-col justify-center items-center md:items-start gap-3 md:flex-row">
          <div className="flex flex-col gap-3">
            <UserForm saveCalculationResults={setCalculationResults} />
            <Information />
          </div>
          {calculationResults ? (
            <Results orderResults={calculationResults} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
