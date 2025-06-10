import styles from "./loginbutton.module.scss";

export default function LoginButton({ platform }) {
  const handleLogin = () => {
    window.location.href = `http://localhost:8000/auth/${platform}/login`;
  };
  return (
    <button onClick={handleLogin} className={`${styles.login} ${styles[platform]}`}>
      Bejelentkezés {platform.charAt(0).toUpperCase() + platform.slice(1)}-ra
    </button>
  );
}
// This component renders a login button for a specified platform.
// When clicked, it redirects the user to the login URL for that platform.
