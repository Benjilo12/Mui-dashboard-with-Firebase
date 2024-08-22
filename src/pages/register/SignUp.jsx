import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import pexel2 from "../../assets/pexel2.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignUp() {
  const paperStyle = {
    padding: "30px 10px",
    width: 450,
    margin: "20px auto",
    alignContent: "center",
    borderRadius: "10px",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop5px = { marginTop: "15px" };
  const buttonStyle = { display: "block", margin: "20px auto 0 auto" };
  const gridStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${pexel2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backdropFilter: "blur(60px)",
    // filter: "blur(2px)",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <Grid style={gridStyle}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign up</h2>
          <Typography variant="caption" style={{ fontSize: "15px" }}>
            Please fill this form to create an account
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                name="name"
                variant="filled"
                placeholder="Enter your name"
                style={marginTop5px}
                error={!!(<ErrorMessage name="name" />)}
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                variant="filled"
                type="email"
                placeholder="Enter your email"
                style={marginTop5px}
                error={!!(<ErrorMessage name="email" />)}
                helperText={<ErrorMessage name="email" />}
              />
              <FormControl style={marginTop5px}>
                <FormLabel>Gender</FormLabel>
                <Field
                  as={RadioGroup}
                  name="gender"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormControl>
              <Field
                as={TextField}
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                variant="filled"
                type="number"
                placeholder="Enter your Number"
                style={marginTop5px}
                error={!!(<ErrorMessage name="phoneNumber" />)}
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                name="password"
                variant="filled"
                type="password"
                style={marginTop5px}
                error={!!(<ErrorMessage name="password" />)}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                variant="filled"
                type="password"
                style={marginTop5px}
                error={!!(<ErrorMessage name="confirmPassword" />)}
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Field
                as={FormControlLabel}
                name="terms"
                control={<Checkbox />}
                label="I accept the terms and conditions"
                style={marginTop5px}
                error={!!(<ErrorMessage name="terms" />)}
              />
              <ErrorMessage
                name="terms"
                component="div"
                style={{ color: "red" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={buttonStyle}
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default SignUp;
