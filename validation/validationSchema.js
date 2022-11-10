import * as Yup from "yup";

const validationUserSchema = Yup.object({
  fullName: Yup.string().min(5, "Must be at least 5 characters").required("Full name is required!"),
  email: Yup.string().email("Must be a valid email").required("Email is required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Enter your password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm your password!"),
});

export { validationUserSchema };
