import { Link } from "react-router-dom";


/** children should be the inputs with their labels you put */
export default function LoginForm({ children, title, btnLabel, handleSubmit, userFallback = null }) {
  return (
    <div className="
      w-full max-w-[500px] 
      mx-auto p-3
      border border-prime my-rounding
    ">
      <h2 className="text-center uppercase pb-3">{title}</h2>

      <form className="px-1.5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {children}
        </div>

        <div className="flex flex-col mt-6">
          <button className={`
            block btn mx-auto
            bg-second text-dark font-bold
            uppercase 
          `}>
            {btnLabel}
          </button>

          {userFallback && (
            <p className="text-center">
              {userFallback.phrase}
              <Link className="is-link" to={userFallback.link}>
                {userFallback.action}
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
