import * as yup from "yup";

export const formValidatorSchema = yup.object().shape({
  cartValue: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Value must be a number")
    .positive("Can't be a negative number")
    .required("Cart value is required"),
  deliveryDistance: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Distance must be a number")
    .positive("Can't be a negative number")
    .required("Delivery distance is required"),
  numberOfItems: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Amount of items must be a number")
    .positive("Can't be a negative number")
    .required("Amount of items is required"),
  orderTime: yup
    .date()
    .transform(function (value) {
      return this.isType(value) ? value : undefined;
    })
    .required("Valid time is required"),
});
