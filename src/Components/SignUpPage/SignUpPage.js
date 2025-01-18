import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import axios from "axios";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobnumber, setMobNumber] = useState("");
  const [loginid, setLoginId] = useState("");
  const [done, setDone] = useState(false);

  const validate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const stringPattern = /^[a-zA-Z]+$/;
    const numberPattern = /^\d+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // console.log(formData.get("password"));

    if (stringPattern.test(formData.get("string"))) {
      if (numberPattern.test(formData.get("number"))) {
        if (passwordPattern.test(formData.get("password"))) {
          if (emailPattern.test(formData.get("email"))) {
            axios
              .post("https://67122e854eca2acdb5f77a1f.mockapi.io/UserData", {
                FirstName: firstname,
                LastName: lastname,
                Email: email,
                MobNumber: mobnumber,
                Password: password,
                LoginId: loginid,
              })
              .then((success) => {
                if (success) {
                  setDone(!done);
                  alert("Registered successfully!");

                  setEmail("");
                  setPassword("");
                  setFirstName("");
                  setLastName("");
                  setMobNumber("");
                  setLoginId("");
                }
              })
              .catch((error) => {
                if (error) {
                  setDone(!done);
                  alert("something went wrong");
                }
              });
          } else {
            alert("Please enter valid email");
          }
        } else {
          alert("Please enter valid password");
        }
      } else {
        alert("Please enter valid mobile number");
      }
    } else {
      alert("Please enter valid firstName/LastName/LoginId");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">
          <div className="d-none d-xl-flex col-xl-6 justify-content-center align-items-center">
            <img src="/images/illustration/rb_54970.png" className="img-fluid" alt="img"/>
          </div>
          <div className="col-12 d-lg-flex justify-content-center align-items-center col-xl-6">
            <div className={styles.signUpDiv}>
              <div className={styles.signUpHeader}>
                <span>Create New Account</span>
              </div>
              <form onSubmit={validate}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputField}
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="string"
                        required
                      />
                      <label className={styles.Label}>First Name</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputField}
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        name="string"
                        required
                      />
                      <label className={styles.Label}>Last Name</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputField}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        required
                      />
                      <label className={styles.Label}>Email</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputField}
                        type="text"
                        value={mobnumber}
                        onChange={(e) => setMobNumber(e.target.value)}
                        name="number"
                        required
                      />
                      <label className={styles.Label}>Mobile No.</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputField}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        required
                      />
                      <label className={styles.Label}>Password</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputField}
                        type="text"
                        value={loginid}
                        onChange={(e) => setLoginId(e.target.value)}
                        name="string"
                        required
                      />
                      <label className={styles.Label}>login Id</label>
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  className={styles.signUpBtn}
                  value="Sign Up"
                ></input>
                <div className={styles.login}>
                  <span>
                    Already have an account?
                    <Link to="/" className={styles.loginAnchor}>
                      Login
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
