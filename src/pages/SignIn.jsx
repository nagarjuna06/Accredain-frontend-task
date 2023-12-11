import {
  Grid,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
  Stack,
  LinearProgress,
} from "@mui/material";
import { Formik } from "formik";
import { signInSchema } from "../../utils/validationSchemas";
import userImage from "../assets/user.svg";
import { useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const SignIn = () => {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const submitting = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    const response = await fetch("http://localhost:5000/signin", {
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
      Cookies.set("_token", data.token, { expires: 1 });
      router("/");
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
          validationSchema={signInSchema}
          initialValues={{ user: "", password: "" }}
          onSubmit={submitting}
        >
          {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
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
                  <TextField
                    size="small"
                    error={!!errors.user}
                    label="Username or Email"
                    name="user"
                    value={values.user}
                    helperText={errors.user}
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                  />
                  <FormControl variant="outlined" size="small">
                    <InputLabel htmlFor="password" error={!!errors.password}>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      id="password"
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      error={!!errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlined />
                            ) : (
                              <VisibilityOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="password"
                    />
                    <FormHelperText error>{errors.password}</FormHelperText>
                  </FormControl>

                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    SignIn
                  </Button>
                  <center>
                    Don't have an account? <Link to="/signup">SignUp</Link>
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

export default SignIn;
