import { Label } from "@/components/ui/label"

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-3">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          name="gender"
          value="male"
          id="male"
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}
        />
        <Label htmlFor="male">Male</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          name="gender"
          value="female"
          id="female"
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")}
        />
        <Label htmlFor="female">Female</Label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
