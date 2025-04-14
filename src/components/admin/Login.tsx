import Label from "../Label";
import "../../Login.css";

const Login = () => {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <Label size="m">Login</Label>
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <input placeholder="email" name="email" className="email-input" />
          <input
            placeholder="password"
            name="password"
            type="password"
            className="password-input"
          />
          <button type="submit" className="admin-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
