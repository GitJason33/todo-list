import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/state/contextHooks";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const { registerUser } = useAuth();
  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allGood = await registerUser(formData);

    if(allGood){ 
      redirect('/dashboard');
      redirect(0);
    }
  }


  return (
    <main className="py-6 px-3">
    <LoginForm
      title="sign up"
      btnLabel="register"
      handleSubmit={handleSubmit}
      userFallback={{
        phrase: "Already have an account? ",
        action: "login",
        link: "/acc/login",
      }}
    >
      <section>
        <label htmlFor="userName" className="acc-input-label">
          Name:
        </label>

        <input 
          id="userName" 
          type="text" 
          className="acc-input"
          maxLength={30}
          required

          value={formData["name"]}
          onChange={e => setFormData( 
            p => ({ ...p, name: e.target.value }) 
          )}
        />
      </section>


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
