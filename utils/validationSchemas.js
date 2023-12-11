import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is Required!"),
  username: yup
    .string()
    .required("Username is Required!")
    .min(4, "User name atleast 4 characters.")
    .max(10, "User name maximum 10 characters"),
  email: yup.string().email("Invalid Email!").required("Email is Required!"),
  password: yup
    .string()
    .min(8, "Your password must be minimum 8 characters.")
    .max(20, "Your password must be maximum 20 characters.")
    .required("password is Required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords doesn't match"),
});

export const signInSchema = yup.object().shape({
  user: yup.string().required("Email or username is Required!"),
  password: yup
    .string()
    .min(8, "Your password must be minimum 8 characters.")
    .max(20, "Your password must be maximum 20 characters.")
    .required("password is Required!"),
});

export const signUpFields = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "username",
    label: "User name",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

export const signInFields = [
  {
    name: "user",
    label: "Username or Email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];
