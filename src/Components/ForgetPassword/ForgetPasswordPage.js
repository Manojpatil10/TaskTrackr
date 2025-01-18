import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgetPass.module.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic (API call to send reset link)
    console.log(`Reset link sent to ${email}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">
          <div className="col-12 d-sm-flex justify-content-center align-items-center col-md-6">
            <div className={styles.forgetPassDiv}>
              <div className={styles.passHeader}>
                <span>Forget Password</span>
              </div>
              <form onSubmit={handleSubmit}>
                {/* <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
                <div className={styles.inputBox}>
                  <input
                    className={styles.inputField}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className={styles.Label}>Email</label>
                </div>
                <button type="submit" className={styles.btnSubmit}>
                  Send Reset Link
                </button>
                <div className={styles.loginBackDiv}>
                  <Link to="/" className={styles.loginBack}>
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-md-flex col-md-6 justify-content-center align-items-center">
            <img src="/images/illustration/Forgot password-amico.svg" className="img-fluid" alt="img"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
