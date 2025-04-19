import Label from "../Label";
import "../../Login.css";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit");
    console.log(`email:${email}  password:${password}`);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <Label size="m">Login</Label>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            placeholder="email"
            name="email"
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="admin-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
