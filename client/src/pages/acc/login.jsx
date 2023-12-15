import { useState } from "react";

import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/contextHooks";


export default function Login() {
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    loginUser(formData);
  }


  return (
    <main className="py-6 px-3">
      <LoginForm
        title="sign in"
        btnLabel="login"
        handleSubmit={handleSubmit}
        userFallback={{
          phrase: "Don't have an account? ",
          action: "register",
          link: "/acc/register",
        }}
      >
        <section>
          <label htmlFor="userEmail" className="acc-input-label">
            Email:
          </label>

          <input 
            id="userEmail" 
            type="email" 
            className="acc-input"
            required

            value={formData["email"]}
            onChange={e => setFormData( 
              p => ({ ...p, email: e.target.value }) 
            )}
          />
        </section>


        <section>
          <label htmlFor="userPassword" className="acc-input-label">
            Password:
          </label>

          <input 
            id="userPassword" 
            type="password" 
            className="acc-input"
            minLength={8}
            required

            value={formData["password"]}
            onChange={e => setFormData( 
              p => ({ ...p, password: e.target.value }) 
            )}
          />
        </section>
      </LoginForm>
    </main>
  )
}
