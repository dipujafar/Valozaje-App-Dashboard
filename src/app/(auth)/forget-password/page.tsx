import { ForgetPassForm } from "@/components/(auth)/forgetPassword/ForgetPassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return <div className="bg-[#93c293]"> <ForgetPassForm /></div>;
};

export default ForgetPasswordPage;
