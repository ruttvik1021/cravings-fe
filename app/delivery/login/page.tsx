"use client";

import { deliveryAgentSignUpApi, userLoginApi } from "@/app/user/apis/auth";
import ErrorMessage from "@/components/errorMessage";
import { TextField } from "@/components/textfield";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Zod validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits")
      .regex(/^[0-9]{10}$/, "Invalid phone number"),
    countryCode: z.string().default("+1"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    pincode: z
      .string()
      .min(6, "Pincode must be 6 digits")
      .max(6, "Pincode must be 6 digits")
      .regex(/^[0-9]{6}$/, "Invalid pincode"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),

    profilePhoto:
      typeof window !== "undefined" ? z.instanceof(FileList) : z.any(),
    idCard: typeof window !== "undefined" ? z.instanceof(FileList) : z.any(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<{ [activeTab]: string }>({});
  const [countryCode, setCountryCode] = useState("+91");

  const { mutate: deliveryAgentLogin, isPending: isLoginPending } = useMutation(
    {
      mutationFn: (data: LoginFormData) => userLoginApi(data, "delivery_agent"),
      onSuccess: (response) => {
        login(response.data.accessToken, response.data.user);
        loginControl._reset();
      },
      onError(error) {
        setError({
          [activeTab]: error.message,
        });
      },
    }
  );

  const { mutate: deliveryAgentRegistration, isPending: isRegisterPending } =
    useMutation({
      mutationFn: (data: RegisterFormData) => deliveryAgentSignUpApi(data),
      onSuccess: (response) => {
        login(response.data.accessToken, response.data.user);
        registerControl._reset();
      },
      onError(error) {
        setError({
          [activeTab]: error.message,
        });
      },
    });

  const isPending = isLoginPending || isRegisterPending;

  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      countryCode: "+91",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    deliveryAgentLogin(data);
  };

  const handleRegister = async (data: RegisterFormData) => {
    deliveryAgentRegistration(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Delivery Partner Portal
          </CardTitle>
          <CardDescription>Sign in to start delivering orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit(handleLogin)} noValidate>
                <div className="grid gap-4">
                  <Controller
                    name="email"
                    control={loginControl}
                    render={({ field }) => (
                      <TextField
                        type="email"
                        label="Email"
                        name="email"
                        value={field.value}
                        onChange={field.onChange}
                        error={loginErrors.email?.message}
                        placeholder="m@example.com"
                        required
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={loginControl}
                    render={({ field }) => (
                      <TextField
                        type="password"
                        label="Password"
                        name="password"
                        value={field.value}
                        onChange={field.onChange}
                        error={loginErrors.password?.message}
                        required
                      />
                    )}
                  />

                  {error[activeTab] && (
                    <ErrorMessage message={error[activeTab]} />
                  )}

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit(handleRegister)} noValidate>
                <div className="grid gap-4">
                  <Controller
                    name="name"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="text"
                        label="Full Name"
                        name="name"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.name?.message}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="tel"
                        label="Mobile Number"
                        name="phone"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.phone?.message}
                        countryCode={countryCode}
                        onCountryCodeChange={(code) => {
                          setCountryCode(code);
                          setValue("countryCode", code);
                        }}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="email"
                        label="Email"
                        name="email"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.email?.message}
                        placeholder="m@example.com"
                        required
                      />
                    )}
                  />

                  <Controller
                    name="address"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="text"
                        label="Address"
                        name="address"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.address?.message}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="pincode"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="text"
                        label="Pincode"
                        name="pincode"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.pincode?.message}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="password"
                        label="Password"
                        name="password"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.password?.message}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={registerControl}
                    render={({ field }) => (
                      <TextField
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={field.value}
                        onChange={field.onChange}
                        error={registerErrors.confirmPassword?.message}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="profilePhoto"
                    control={registerControl}
                    render={({ field }) => (
                      <div>
                        <Label>Profile Photo</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          required
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="idCard"
                    control={registerControl}
                    render={({ field }) => (
                      <div>
                        <Label>ID Card</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          required
                        />
                      </div>
                    )}
                  />

                  {error[activeTab] && (
                    <ErrorMessage message={error[activeTab]} />
                  )}

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center mt-2">
            By continuing, you agree to our{" "}
            <Link
              href="#"
              className="text-primary underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
