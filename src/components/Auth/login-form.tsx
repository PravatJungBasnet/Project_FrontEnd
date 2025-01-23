"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import useLogin from "@/hooks/use-login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { formData, isLoading, onChange, onSumit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
  
      if (token ) {
        router.replace("/");
      }
    }, [router]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSumit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="m@example.com"
                  className="text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="********"
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full border text-white rounded-lg px-4 py-2 pr-10" // Add padding-right for the icon
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="text-white" size={20} />
                    ) : (
                      <Eye className="text-white" size={20} />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? "loading..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
