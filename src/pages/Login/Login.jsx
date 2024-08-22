import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import pexel2 from "../../assets/pexel2.jpg";

import "./Login.css";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/auth/Context/AuthProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function Login() {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      await doSignInWithEmailAndPassword(values.email, values.password);
      console.log("User signed in successfully. Navigating to dashboard.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error); // Enhanced logging
      if (error.code === "auth/popup-closed-by-user") {
        setErrorMessage(
          "The sign-in popup was closed before completing the sign-in process. Please try again."
        );
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      await doSignInWithGoogle();
      console.log("User signed in with Google. Navigating to dashboard.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error); // Enhanced logging
      if (error.code === "auth/popup-closed-by-user") {
        setErrorMessage(
          "The sign-in popup was closed before completing the sign-in process. Please try again."
        );
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <section className="section">
      <div className="imgBx">
        <img src={pexel2} alt="Background" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login</h2>
          <Formik
            initialValues={{ email: "", password: "", remember: false }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="form">
                <div className="inputBx">
                  <span>Email</span>
                  <Field id="email" name="email" type="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="inputBx">
                  <span>Password</span>
                  <Field id="password" name="password" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="remember">
                  <label>
                    <Field type="checkbox" name="remember" />
                    Remember me
                  </label>
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="inputBx">
                  <button className="btn" type="submit" disabled={isSigningIn}>
                    {isSigningIn ? "Signing in..." : "Sign in"}
                  </button>
                </div>
                <div className="inputBx">
                  <div>
                    Don't have an account?{" "}
                    <Link
                      to={"/signup"}
                      style={{ textDecoration: "none", color: "#3987c9" }}
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <h3>Login with Google</h3>
          <div className="container" onClick={handleGoogleSignIn}>
            <div className="g-sign-in-button">
              <div className="content-wrapper">
                <div className="logo-wrapper">
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                  />
                </div>
                <span className="text-container">
                  <span>Sign in with Google</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
