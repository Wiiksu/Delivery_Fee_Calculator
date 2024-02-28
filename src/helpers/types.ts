import { InputHTMLAttributes } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export type ButtonPropTypes = {
  title: string;
  type: "submit" | "reset";
};

export type UserFormType = {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: Date;
};

export type UserFormReturnType = {
  cartValueSurcharge: number;
  deliveryDistanceSurcharge: number;
  numberOfItemsSurcharge: number;
  orderTimeSurcharge: number;
  orderTotal: number;
  freeOrder: boolean;
};

export interface UserFormProps {
  saveCalculationResults: (results: UserFormReturnType | undefined) => void;
}

export interface ResultProps {
  orderResults?: UserFormReturnType;
}

type SubInfoType = {
  title: string;
  info: string;
};

export type ItemsType = {
  title: string;
  subinformation: SubInfoType[];
};
