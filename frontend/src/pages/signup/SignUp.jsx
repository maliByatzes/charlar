import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="w-full max-w-md p-6">
      <h1 className="text-xl font-semibold text-center mb-6">
        Register account
      </h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" placeholder="Enter your username" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password again"
          />
        </div>

        <GenderCheckbox />

        <a href="#" className="text-sm hover:underline inline-block">
          Already have an account?
        </a>

        <Button className="w-full p-2 mt-4">Register</Button>
      </form>
    </div>
  );
};

export default SignUp;
