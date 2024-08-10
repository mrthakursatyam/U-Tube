import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { GoogleLoginBtn } from "../../Components/GoogleButtons/GoogleLoginBtn";
import { CLIENT_ID } from "../../data";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    // return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please fill in email field correctly");
      return;
    } else if (!validatePassword(password)) {
        setError("Enter correct password");
        return;
      } else {
        localStorage.setItem('login',true)
        navigate("/home");
    }
  }

  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('Logged in as: ' + profile.getName());
    // Optionally, you can save user information to local storage or a state management solution

    // Navigate to profile page or handle authentication success
    navigate('/home');
  };

  const onFailure = (error) => {
    console.log('Google Sign-In failed:', error);
    // Handle failure, e.g., show an error message to the user
  };

  

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="groups">
          <fieldset className="form-group">
            <legend>Email</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="form-group">
            <legend>Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
        </div>
        <button type="submit">Login</button>
        <h5>OR</h5>
        <GoogleLoginBtn />
      </form>
    </div>
  )
};
