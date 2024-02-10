import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import signin from "../assets/signin.png";
import signup from "../assets/signup.png";

export default function Login({ setIsAuth }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title = "Login";
  }, []);
  const { token, setToken, setUser } = useContext(UserContext);
  const [localUser, setLocalUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userDataSignUp, setUserDataSignUp] = useState({
    company: "",
    name: "",
    email: "",
    password: "",
    phone: 0,
    profilePicture: "",
    role: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange_sign_up = (event) => {
    setUserDataSignUp({
      ...userDataSignUp,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange_sign_in = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const onclick_sign_in_btn = () => {
    const container = document.querySelector(".container123");
    container.classList.remove("sign-up-mode");
  };
  const onclick_sign_in_btn2 = () => {
    const container = document.querySelector(".container123");
    container.classList.remove("sign-up-mode2");
  };
  const onclick_sign_up_btn = () => {
    const container = document.querySelector(".container123");
    container.classList.add("sign-up-mode");
  };
  const onclick_sign_up_btn2 = () => {
    const container = document.querySelector(".container123");
    container.classList.add("sign-up-mode2");
  };

  const loginForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.status === 404) {
      toast.error("Admin not found");
    } else if (response.status === 400) {
      toast.warning("Invalid credentials");
    } else {
      const data = await response.json();
      setToken(data.accessToken);
      setUser(data);
      console.log(data);
      console.log(data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("login successful");
      navigate("/");
    }
    setIsLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setUserDataSignUp({ ...userDataSignUp, profilePicture: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const signupForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataSignUp),
      }
    );

    if (response.status === 400) {
      toast.warning("Email already exists");
    } else {
      toast.success("Registration successful");
      // onclick_sign_in_btn();
      // onclick_sign_in_btn2();
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* <div className='text-white'>Login</div> */}
      {!isLoading ? (
        <>
          <div className="login_body">
            <div className="container123">
              <div className="signin-signup">
                <form onSubmit={loginForm} className="sign-in-form">
                  <h2 className="title123">Sign in</h2>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange_sign_in}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="current-password"
                      value={userData.password}
                      onChange={handleChange_sign_in}
                      required
                    />
                  </div>
                  <div className="register-checkboxes">
                    <span>Login As: </span>
                    <span>
                      <input
                        type="radio"
                        name="role"
                        id="register-checkbox-1"
                        value="admin"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            role: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="register-checkbox-1">Company Owner</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        name="role"
                        id="register-checkbox-2"
                        value="developer"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            role: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="register-checkbox-2">Developer</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        name="role"
                        id="register-checkbox-3"
                        value="scrummaster"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            role: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="register-checkbox-3">Scrum Master</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        name="role"
                        id="register-checkbox-4"
                        value="productowner"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            role: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="register-checkbox-4">Customer</label>
                    </span>
                  </div>
                  <button type="submit" value="Login" className="btn123">
                    Sign In
                  </button>
                  <p className="account-text">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      id="sign-up-btn2"
                      onClick={onclick_sign_up_btn2}
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
                <form onSubmit={signupForm} className="sign-up-form">
                  <h2 className="title123">Sign up</h2>
                  <div className="input-field">
                    <i className="fas fa-file-signature"></i>
                    <input
                      type="text"
                      placeholder="Name"
                      id="sign_up_name"
                      onChange={handleChange_sign_up}
                      name="name"
                      value={userDataSignUp.name}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      id="sign_up_email"
                      onChange={handleChange_sign_up}
                      name="email"
                      value={userDataSignUp.email}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      id="sign_up_password"
                      onChange={handleChange_sign_up}
                      name="password"
                      value={userDataSignUp.password}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-phone"></i>
                    <input
                      type="number"
                      placeholder="Phone"
                      id="sign_up_phone"
                      onChange={handleChange_sign_up}
                      name="phone"
                      value={
                        userDataSignUp.phone == 0 ? "" : userDataSignUp.phone
                      }
                      required
                    />
                  </div>
                  <div className="register-checkboxes">
                    <span>Register As: </span>
                    <span>
                      <input
                        type="radio"
                        name="role"
                        id="register-checkbox-11"
                        value="admin"
                        onChange={(e) => {
                          setUserDataSignUp({
                            ...userDataSignUp,
                            role: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="register-checkbox-11">Company Owner</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        name="role"
                        id="register-checkbox-12"
                        value="productowner"
                        onChange={(e) => {
                          setUserDataSignUp({
                            ...userDataSignUp,
                            role: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="register-checkbox-12">Customer</label>
                    </span>
                  </div>
                  {
                    userDataSignUp.role === "admin" && (
                      <div className="input-field">
                        <i className="fas fa-building"></i>
                        <input
                          type="text"
                          placeholder="Company"
                          id="sign_up_company"
                          onChange={handleChange_sign_up}
                          name="company"
                          value={userDataSignUp.company}
                          required
                        />
                      </div>
                    ) 
                  }
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePicture"
                    onChange={handleImageUpload}
                    required
                  />
                  <button type="submit" value="Sign up" className="btn123">
                    Sign Up
                  </button>
                  
                  <p className="account-text">
                    Already have an account?{" "}
                    <Link id="sign-in-btn2" onClick={onclick_sign_in_btn2}>
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>
              <div className="panels-container">
                <div className="panel left-panel">
                  <div className="content123">
                    <h3>Member of our Community?</h3>
                    <p>
                      Enhance your dining adventure! Sign in for exclusive perks
                      and seamless reservations at JoyJunction - your gateway to
                      extraordinary flavors.
                    </p>
                    <button
                      className="btn123"
                      id="sign-in-btn"
                      onClick={onclick_sign_in_btn}
                    >
                      Sign in
                    </button>
                  </div>
                  <img src={signin} alt="" className="image" />
                </div>
                <div className="panel right-panel">
                  <div className="content123">
                    <h3>New to our Community?</h3>
                    <p>
                      "Indulge in a world of culinary delights - sign up now to
                      savor exclusive offers, delectable surprises, and a
                      journey of flavors waiting to enchant your taste buds at
                      JoyJunction!"
                    </p>
                    <button
                      className="btn123"
                      id="sign-up-btn"
                      onClick={onclick_sign_up_btn}
                    >
                      Sign up
                    </button>
                  </div>
                  <img src={signup} alt="" className="image" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-center">Loading...</h1>
      )}
    </>
  );
}
