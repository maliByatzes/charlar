import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "@/src/hooks/useRegister";
import { Loader } from "lucide-react";

const Register = () => {

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, register } = useRegister();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(inputs);
  };

  return (
    <div className="w-full max-w-md p-6">
      <h1 className="text-xl font-semibold text-center mb-6">
        Register account
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="johndoe@email.com"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            placeholder="johndoe"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          />
        </div>

        <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

        <Link to={"/login"} className="text-sm hover:underline inline-block">
          {"Already have an account?"}
        </Link>

        <Button className="w-full p-2 mt-4">
          {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
