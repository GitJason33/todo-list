import { Link } from 'react-router-dom'


export default function LoginRequired({ reason = "do this." }) {
  return (
    <main className="py-6 px-3">
      {"You have to "}
      <Link to="/acc/login" className="is-link">{"Login"}</Link> 
      {" in order to " + reason}
    </main>
  )
}
