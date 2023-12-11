import { Grid, TextField, Stack, Button, LinearProgress } from "@mui/material";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import { signUpSchema, signUpFields } from "../../utils/validationSchemas";
import userImage from "../assets/user.svg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = () => {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (key) =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));

  const submitting = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.status == 500) {
      alert(data.msg);
    } else if (response.status == 400) {
      setErrors(data);
    } else {
      alert(data.msg);
      router("/signin");
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Formik
          validationSchema={signUpSchema}
          initialValues={{
            name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={submitting}
        >
          {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Stack
                width={350}
                boxShadow={5}
                borderRadius={2}
                overflow="hidden"
              >
                {isSubmitting && <LinearProgress />}
                <Stack spacing={2} padding={2}>
                  <Stack direction="column" alignItems="center">
                    <img src={userImage} width={40} height={40} />
                  </Stack>

                  {signUpFields.map((each, index) =>
                    each?.type == "password" ? (
                      <FormControl key={index} variant="outlined" size="small">
                        <InputLabel
                          htmlFor={each.name}
                          error={!!errors[each.name]}
                        >
                          {each.label}
                        </InputLabel>
                        <OutlinedInput
                          name={each.name}
                          id={each.name}
                          value={values[each.name]}
                          type={showPassword[each.name] ? "text" : "password"}
                          onChange={handleChange}
                          error={!!errors[each.name]}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  handleClickShowPassword(each.name)
                                }
                                edge="end"
                              >
                                {showPassword[each.name] ? (
                                  <VisibilityOffOutlined />
                                ) : (
                                  <VisibilityOutlined />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label={each.label}
                        />
                        <FormHelperText error>
                          {errors[each.name]}
                        </FormHelperText>
                      </FormControl>
                    ) : (
                      <TextField
                        size="small"
                        key={index}
                        error={!!errors[each.name]}
                        label={each.label}
                        name={each.name}
                        value={values[each.name]}
                        helperText={errors[each.name]}
                        variant="outlined"
                        onChange={handleChange}
                        type="text"
                      />
                    )
                  )}

                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    SignUp
                  </Button>
                  <center>
                    Already have an account? <Link to="/signin">SignIn</Link>
                  </center>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignUp;
