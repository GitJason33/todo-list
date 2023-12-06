import { useAuth } from "@/state/contextHooks";
import { Link } from "react-router-dom";


export default function Profile() {
  const { isLoggedIn, user } = useAuth();

  
  return isLoggedIn && user ? (
    <main className="py-6 px-3">
      <table className="border-2 border-weak mx-auto max-eye-view">
        <tbody className="table-diff-bgs">
          {Object.keys(user).map(
            (key, idx) => (
              <tr key={idx}>
                <td className="text-prime py-1.5 px-3">{key}</td>
                <td className=" py-1.5 px-3">{
                  key === "created_at" ? new Date(user[key]).toLocaleDateString("en-UK") : user[key]
                }</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  ) : (
    <main className="py-6 px-3">
      {"You have to "}
      <Link to="/acc/login" className="is-link">{"Login"}</Link> 
      {" in order to view your account information"}
    </main>
  )
}
