import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import pexel1 from "../../assets/pexel1.jpg";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Login.css"; // Import the CSS file
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/auth/Context/AuthProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (values) => {
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      await doSignInWithEmailAndPassword(values.email, values.password);
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } catch (error) {
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
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } catch (error) {
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
        <img src={pexel1} alt="Background" />
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
                  <p>
                    Don't have an account? <a href="/">Sign up</a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
          <h3>Login with social media</h3>
          <ul className="socialIcons">
            <li>
              <EmailIcon fontSize="large" onClick={handleGoogleSignIn} />
            </li>
            <li>
              <FacebookIcon fontSize="large" />
            </li>
            <li>
              <TwitterIcon fontSize="large" />
            </li>
            <li>
              <InstagramIcon fontSize="large" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Login;
