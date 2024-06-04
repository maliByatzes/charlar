import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <div className="w-full max-w-md p-6 rounded-lg">
      <h1 className="text-xl font-semibold text-center mb-6">
        Login to account
      </h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <a href="#" className="text-sm hover:underline inline-block">
          Don't have an account&#63;
        </a>

        <Button className="w-full p-2 mt-4">Login</Button>
      </form>
    </div>
  );
};

export default Login;
