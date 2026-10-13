import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to access CampusFind AI"
      >

        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <Button className="w-full">
            Login
          </Button>

          <p className="text-center text-sm text-slate-600">
            Don't have an account? Register
          </p>

        </form>

      </AuthCard>

    </main>
  );
}