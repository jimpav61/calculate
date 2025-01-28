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
    
    // Take only the last 10 digits if there are more
    const last10Digits = cleaned.slice(-10);
    
    // If we don't have enough digits, return the partial format
    if (last10Digits.length < 10) {
      // Format what we have into groups
      const areaCode = last10Digits.slice(0, 3);
      const middle = last10Digits.slice(3, 6);
      const last = last10Digits.slice(6);
      
      const parts = [
        '+1',
        areaCode ? ` ${areaCode}` : '',
        middle ? ` ${middle}` : '',
        last ? ` ${last}` : ''
      ].filter(Boolean);
      
      return parts.join('');
    }
    
    // Format complete number
    return `+1 ${last10Digits.slice(0,3)} ${last10Digits.slice(3,6)} ${last10Digits.slice(6)}`;
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
          placeholder="+1 514 994 7178"
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          Format: +1 XXX XXX XXXX (e.g., +1 514 994 7178)
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