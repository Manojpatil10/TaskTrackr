import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import styles from "./LoginPage.module.css";
import axios from "axios";

function LoginPage() {
  const [userEmail, setEmail] = useState("");
  const [userPass, setPassword] = useState("");
  const [UserLoginId, setLoginId] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userData, setUserData] = useState([]);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  // const [pass, setPass] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible); // Toggle the state
  };

  useEffect(() => {
    axios
      .get("https://67122e854eca2acdb5f77a1f.mockapi.io/UserData")
      .then((success) => {
        setUserData(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [done]);

  // console.log(userData);

  const handleLogin = (e) => {
    e.preventDefault();

    // Find the user based on email and password
    const user = userData.find(
      (u) => u.Email === userEmail && u.Password === userPass
    );

    console.log("Entered Email:", userEmail);
    console.log("Entered Password:", userPass);

    if (user) {
      // Navigate based on LoginId
      if (user.LoginId === "admin") {
        navigate(`/admin`); // Redirect to Admin Dashboard
      } else if (user.LoginId === "user") {
        navigate(`/user/${user.id}`); // Redirect to User Dashboard
      }
    } else {
      // Handle invalid credentials
      // setError("Invalid email or password. Please try again.");
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">
          <div className="col-12 d-sm-flex justify-content-center align-items-center col-lg-5">
            <div className={styles.loginBox}>
              <div className={styles.loginHeader}>
                <span>Login</span>
              </div>
              <form onSubmit={handleLogin}>
                <div className={styles.inputBox}>
                  <input
                    className={styles.inputField}
                    type="email"
                    value={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className={styles.Label}>Email</label>
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className={styles.inputBox}>
                  <input
                    className={styles.inputField}
                    type={isPasswordVisible ? "text" : "password"} // Toggle input type based on state
                    value={userPass}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className={styles.Label}>Password</label>
                  <i
                    className={`fa-solid ${
                      isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={togglePasswordVisibility} // Handle icon click
                  ></i>
                </div>
                <div className={styles.inputBox}>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={UserLoginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    required
                  />
                  <label className={styles.Label}>Login Id</label>
                  <i className="fa-solid fa-id-card"></i>
                </div>
                <div className={styles.rememberForget}>
                  <div className={styles.rememberMe}>
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <div className={styles.forget}>
                    <Link to="/ForgetPass" className={styles.forgetAnchor}>
                      Forget password
                    </Link>
                  </div>
                </div>
                <div className={styles.inputBox}>
                  <input
                    type="submit"
                    className={styles.inputSubmit}
                    value="Login"
                  />
                </div>
                <div className={styles.register}>
                  <span>
                    Don't have an account?
                    <Link to="/SignUp" className={styles.registerAnchor}>
                      Register
                    </Link>
                  </span>
                </div>
              </form>

              <div className={styles.socialLogin}>
                <p>Or log in with:</p>
                <div className={styles.socialIcons}>
                  <FaFacebook
                    className={styles.socialIcon}
                    // onClick={() => handleSocialLogin("Facebook")}
                  />
                  <FaGoogle
                    className={styles.socialIcon}
                    // onClick={() => handleSocialLogin("Google")}
                  />
                  <FaTwitter
                    className={styles.socialIcon}
                    // onClick={() => handleSocialLogin("Twitter")}
                  />
                  <FaGithub
                    className={styles.socialIcon}
                    // onClick={() => handleSocialLogin("Github")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block col-lg-7 d-lg-flex align-items-center">
            <img src="/images/illustration/rb_5488.png" className="img-fluid" alt="img"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
