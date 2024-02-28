import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidatorSchema } from "../../helpers/FormValidation";
import { InputField } from "../inputfield/InputField";
import SubmitBtn from "../submitbtn/SubmitBtn";
import {
  UserFormProps,
  UserFormReturnType,
  UserFormType,
} from "../../helpers/types";
import { surchargeCalculator } from "../../helpers/SurchargeCalculator";

export default function UserForm({ saveCalculationResults }: UserFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm<UserFormType>({
    mode: "all",
    resolver: yupResolver(formValidatorSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    try {
      const results: UserFormReturnType = surchargeCalculator(data);
      saveCalculationResults(results);
      resetField("cartValue");
      resetField("deliveryDistance");
      resetField("numberOfItems");
      resetField("orderTime");
    } catch (error) {
      console.error("Error in surcharge calculation:");
      console.error(error);
    }
  };

  return (
    <section className="bg-purple-400 px-6 pb-6 pt-2 rounded shadow-lg h-fit w-[22rem] md:w-[27rem]">
      <h2 className="text-center text-purple-50 text-2xl font-bold py-2 mt-3 mb-4 bg-purple-500 border-2 border-purple-50 border-opacity-60 rounded-md select-none">
        Order Details
      </h2>
      <form
        noValidate
        className="flex flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          {...register("cartValue")}
          data-testid="cartValue"
          label="Cart Value"
          type="text"
          errorMessage={errors.cartValue?.message}
        />
        <InputField
          {...register("deliveryDistance")}
          data-testid="deliveryDistance"
          label="Delivery distance"
          type="text"
          errorMessage={errors.deliveryDistance?.message}
        />
        <InputField
          {...register("numberOfItems")}
          data-testid="numberOfItems"
          label="Amount of items"
          type="text"
          errorMessage={errors.numberOfItems?.message}
        />
        <InputField
          {...register("orderTime")}
          data-testid="orderTime"
          label="Time"
          type="datetime-local"
          errorMessage={errors.orderTime?.message}
        />
        <div className="flex flex-col mt-2 gap-3">
          <SubmitBtn title="Calculate Delivery Fee" type="submit" />
        </div>
      </form>
    </section>
  );
}
