"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
// import logo from "@/assets/logo-without-bg.png"
import { useState } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      // @ts-ignore
      if (!jwtDecode(response?.data?.token)?.roles?.includes("admin")) {
        toast.error("You are not authorized to access this panel.");
        return;
      }

      if (response?.success) {
        // Store token and user data in Redux
        dispatch(
          setUser({
            user: jwtDecode(response?.data?.token),
            token: response?.data?.token,
          }),
        );

        toast.success(response.message || "Login successful!");

        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-4xl bg-white py-5 px-5 rounded-lg">
        <div className="text-center">
          {/* <div className="flex justify-center ">
            <Image src={logo} width={200} height={250} alt="FreedomPath Logo" />
          </div> */}
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome To Valozaje
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-foreground">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-foreground">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-12 rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <Eye />
                      ) : (
                        <EyeOff />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              {/* <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
                  </FormItem>
                )}
              /> */}
              <div></div>

              <Link
                href="/forget-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-main-color hover:bg-green-700 text-white rounded-lg font-normal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
