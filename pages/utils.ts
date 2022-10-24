import { Userdata } from "@prisma/client";

export const libs: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["visualization"];

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  city: string;
  street: string;
  state: string;
  ccnumber: string;
}

export interface Errors {
  firstName: boolean;
  lastName: boolean;
  age: boolean;
  city: boolean;
  street: boolean;
  state: boolean;
  ccnumber: boolean;
  isError: boolean;
}

export const validateCreateForm = (formData: FormData): Errors => {
  const errors = {
    firstName: false,
    lastName: false,
    age: false,
    city: false,
    street: false,
    state: false,
    ccnumber: false,
    isError: false,
  };

  if (formData.firstName === undefined || formData.firstName === "")
    errors.firstName = true;
  if (formData.lastName === undefined || formData.lastName === "")
    errors.lastName = true;
  if (formData.age === undefined || formData.age === "") errors.age = true;
  if (formData.city === undefined || formData.city === "") errors.city = true;
  if (formData.street === undefined || formData.street === "")
    errors.street = true;
  if (formData.state === undefined || formData.state === "")
    errors.state = true;
  if (formData.ccnumber === undefined || formData.ccnumber === "")
    errors.ccnumber = true;
  if (isNaN(parseInt(formData.age))) errors.age = true;

  if (
    errors.firstName ||
    errors.lastName ||
    errors.age ||
    errors.city ||
    errors.street ||
    errors.state ||
    errors.ccnumber
  )
    errors.isError = true;

  return errors;
};

export const createInitValues = () => {
  return {
    firstName: false,
    lastName: false,
    age: false,
    city: false,
    street: false,
    state: false,
    ccnumber: false,
  };
};
