import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

interface ContactInfoStepProps {
  formData: {
    phone: string;
    email: string;
    website: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoStep = ({ formData, onChange }: ContactInfoStepProps) => {
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      if (parts.length === 0) return '';
      if (parts.length === 1) return parts[0];
      if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
      return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onChange({
      ...e,
      target: {
        ...e.target,
        name: 'phone',
        value: formattedValue,
      },
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="mt-1"
          placeholder="(555) 123-4567"
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          Format: (XXX) XXX-XXXX
        </p>
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