"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";

import { userLoginApi } from "@/app/user/apis/auth";
import { TextField } from "@/components/textfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "@/components/errorMessage";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { mutate: userLogin, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginFormData) => userLoginApi(data, "admin"),
    onSuccess: (response) => {
      login(response.data.accessToken, response.data.user);
      loginControl._reset();
    },
    onError(error) {
      setError(error.message);
    },
  });

  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    userLogin(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
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

              {error && <ErrorMessage message={error} />}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoginPending}
              >
                {isLoginPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center mt-2">
            This portal is restricted to authorized administrators only.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
