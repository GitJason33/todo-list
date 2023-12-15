import { useAuth } from "@/context/contextHooks";


export default function Header() {
  const { isLoggedIn, user } = useAuth();

  return isLoggedIn && (
    <header className="py-1.5 px-3">
      <h3 className="font-normal">
        Hello, {user.name}!
      </h3>
    </header>
  )
}
