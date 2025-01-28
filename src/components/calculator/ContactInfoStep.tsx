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
    let cleaned = value.replace(/\D/g, '');
    
    // Remove leading '1' if present, as we'll add the +1 prefix
    if (cleaned.startsWith('1')) {
      cleaned = cleaned.substring(1);
    }
    
    // Take only the last 10 digits if there are more
    cleaned = cleaned.slice(-10);
    
    // If we don't have enough digits, return partial format
    if (cleaned.length < 10) {
      let formatted = '+1';
      if (cleaned.length > 0) formatted += ' ' + cleaned.slice(0, 3);
      if (cleaned.length > 3) formatted += ' ' + cleaned.slice(3, 6);
      if (cleaned.length > 6) formatted += ' ' + cleaned.slice(6);
      return formatted;
    }
    
    // Format complete number as +1 XXX XXX XXXX
    return `+1 ${cleaned.slice(0,3)} ${cleaned.slice(3,6)} ${cleaned.slice(6)}`;
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