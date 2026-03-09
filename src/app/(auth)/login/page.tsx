import LoginForm from "@/components/(auth)/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for the dashboard.",
};

const LoginPage = () => {
  return <div className="bg-[#93c293]">
    <LoginForm />
  </div>;
};

export default LoginPage;
