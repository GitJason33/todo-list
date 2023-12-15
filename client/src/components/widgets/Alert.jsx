import { useAlert } from "@/context/contextHooks";

export default function Alert() {
  const { open, msg, isError, Alert } = useAlert();
  
  const styles = {
    bg: isError ? "!bg-high" : "!bg-low",
    text: isError ? "!text-high" : "!text-low",
    title: isError ? "error" : "success",
    border: isError ? "!border-high" : "!border-low",
  };


  return open && (
    <aside className={`alert ${styles.border}`}>
      <button 
        onClick={Alert.close} 
        className="alert-close-icon"
      >
        x
      </button>

      <div className={`${styles.bg} w-fit px-3 rounded-md text-dark font-bold mb-3`}>{styles.title}</div>
      <p className={`${styles.text}`}>{msg}</p>
    </aside>
  );
}