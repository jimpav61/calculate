import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  formData: {
    name: string;
    companyName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoStep = ({ formData, onChange }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          className="mt-1"
          required
        />
      </div>
    </div>
  );
};