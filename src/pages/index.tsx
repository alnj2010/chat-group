import Link from "next/link";

export default function Login() {
  return (
    <>
      <Link href="/register" data-testid="register-link">
        Register
      </Link>
    </>
  );
}
