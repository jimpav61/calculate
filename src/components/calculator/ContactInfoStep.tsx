import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoStepProps {
  formData: {
    phone: string;
    email: string;
    website: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoStep = ({ formData, onChange }: ContactInfoStepProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={onChange}
          className="mt-1"
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
};