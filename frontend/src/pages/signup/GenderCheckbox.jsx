import { Checkbox } from "@/components/ui/checkbox";

const GenderCheckbox = () => {
  return (
    <div className="flex gap-3">
      <Checkbox id="male" />
      <label htmlFor="male" className="text-sm">Male</label>
      <Checkbox id="female" />
      <label htmlFor="female" className="text-sm">Female</label>
    </div>
  );
};

export default GenderCheckbox;
