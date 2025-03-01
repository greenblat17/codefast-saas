import Link from "next/link";

const ButtonLogin = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Go to dashboard
      </Link>
    );
  }

  return <button>Login</button>;
};

export default ButtonLogin;
